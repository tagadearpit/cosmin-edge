import type {Metadata} from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroller from '@/components/SmoothScroller';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cosmic Edge | Premium Experience',
  description: 'A cinematic cosmic experience built for the future.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased bg-black text-white selection:bg-violet-500/30 selection:text-white" suppressHydrationWarning>
        <SmoothScroller>
          <CustomCursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
