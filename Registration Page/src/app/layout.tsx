
import Header from '@/components/header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers, NextAuthProvider } from '@/components';

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: `DonEx Dashboard`,
  description: 'Donate to your favorite person across all social media platforms.',
}

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  )
}
