import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { processIdCard } from '@/lib/google-vision';
import { convexHttp, api } from '@/lib/convexHttp';
import type { Id } from '@convex/_generated/dataModel';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { image } = await request.json();
        if (!image) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        // Process the ID card image
        const result = await processIdCard(Buffer.from(image, 'base64'));
        
        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        if (
            !result.extracted_data.student_id ||
            !result.extracted_data.name ||
            !result.extracted_data.college_name
        ) {
            return NextResponse.json(
                {
                    ...result,
                    success: false,
                    error: 'Missing required fields from ID verification',
                },
                { status: 400 }
            );
        }

        // Verify against database
        const college = await convexHttp.query(
            api.idVerification.findCollegeByName,
            {
                name: result.extracted_data.college_name || '',
            }
        );

        if (!college) {
            return NextResponse.json({
                ...result,
                success: false,
                error: 'College not found in database',
            }, { status: 400 });
        }

        // Check if student ID exists
        const existingCard = await convexHttp.query(
            api.idVerification.getStudentIdCardByStudentId,
            { student_id: result.extracted_data.student_id }
        );

        let studentCardId: Id<'student_id_cards'> | undefined =
            existingCard?._id as Id<'student_id_cards'> | undefined;

        if (existingCard) {
            // Update existing card if needed
            if (existingCard.user_id !== session.user.id) {
                await convexHttp.mutation(
                    api.idVerification.updateStudentIdCard,
                    {
                        id: existingCard._id as Id<'student_id_cards'>,
                        user_id: session.user.id,
                        verification_status: true,
                    }
                );
            }
        } else {
            // Create new card
            const newCard = await convexHttp.mutation(
                api.idVerification.createStudentIdCard,
                {
                    user_id: session.user.id,
                    student_id: result.extracted_data.student_id,
                    college_id: college._id as Id<'colleges'>,
                    full_name: result.extracted_data.name,
                    image_url: image, // Store base64 image
                    verification_status: true,
                }
            );
            studentCardId = newCard?._id as Id<'student_id_cards'> | undefined;
        }

        // Log verification attempt
        await convexHttp.mutation(api.idVerification.createVerificationLog, {
            user_id: session.user.id,
            student_id_card_id: studentCardId,
            verification_status: true,
            confidence_score: result.confidence_score,
            extracted_data: result.extracted_data,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in ID verification:', error);
        return NextResponse.json(
            {
                success: false,
                confidence_score: 0,
                extracted_data: {},
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
} 
