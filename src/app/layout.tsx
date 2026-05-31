// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';
import './globals.css';
import Navbar from './component/Navbar';
import Providers from './providers';
import RouteGuard from './component/RouteGuard';
import FloatingRegisterButton from './component/FloatingRegisterButton'; 

const archive = Archivo_Black({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-archive' 
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // ... your existing metadata
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
            <main>{children}</main>
            
            {/* ✅ ADD THE FLOATING BUTTON HERE - after main content, before closing body */}
            <FloatingRegisterButton />
            
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
}