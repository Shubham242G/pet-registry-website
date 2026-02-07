import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './component/Navbar'; // Adjust alias if needed


import { Archivo_Black } from 'next/font/google'
import ClientNavbar from './component/ClientNavbar';


const archive = Archivo_Black({ 
  subsets: ['latin'], 
  weight: ['400'],  // ✅ Only 400 available
  variable: '--font-archive' 
})
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
        <ClientNavbar /> 
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
