import PublicHeader from '@/components/headers/PublicHeader';
import type { Metadata } from 'next';
import { useSession } from 'next-auth/react';

import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'BE1 Tecnologia',
  description: 'Qualidade de vida no campo!',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const session = useSession()

  return (
    <div className='flex h-screen bg-white'>
        <div className='overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
        </div>
        <div id='main' className='flex-1 overflow-auto px-4'>
          <div className='mb-2'>
            <PublicHeader />
          </div>
          <div className='grow'>{children}</div>
        </div>
      </div>
  );
}
