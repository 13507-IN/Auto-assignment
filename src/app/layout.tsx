import { Armata } from 'next/font/google';
import { Providers } from '@/providers';
import './globals.css';

const armata = Armata({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-armata',
});

export const metadata = {
  title: 'AI Study Assistant',
  description: 'Your personalized AI-powered study companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${armata.className} ${armata.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
