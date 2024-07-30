// layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from '@/components/ui/toaster';
import { NavBar } from '@/components/NavBar';
import { auth } from '@/auth';
import ReactQueryProvider from '@/utils/React-query-Provider';

export const metadata: Metadata = {
  title: 'Dev Tasks',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar user={user} />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
