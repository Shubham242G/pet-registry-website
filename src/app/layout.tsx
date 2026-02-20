import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Archivo_Black } from 'next/font/google';
import Navbar from './component/Navbar';
import Providers from './providers'; // Make sure this path is correct

const archive = Archivo_Black({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-archive' 
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet Registry Website',
  description: 'Register your pets securely',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archive.variable} font-sans`}>
        <Providers>
          <Navbar />
          <div className="h-20" /> 
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}