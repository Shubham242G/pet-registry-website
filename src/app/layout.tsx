import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Archivo_Black } from 'next/font/google';
import Navbar from './component/Navbar';
import Providers from './providers';
import LiveJoinStrip from './component/LiveJoiningStrip';
import RouteGuard from './component/RouteGuard';

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
          <RouteGuard>
            <Navbar />
            <div className="pt-20">
              <LiveJoinStrip/>
            </div>
            <main>{children}</main>
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
}