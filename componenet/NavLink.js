'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? 'text-yellow-600 font-bold' : 'text-gray-700 hover:text-yellow-600'}>
      {children}
    </Link>
  );
}
