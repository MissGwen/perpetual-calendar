'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function SignOutMenuItem() {
  return (
    <DropdownMenu.Item
      onSelect={() => signOut()}
      className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#BE3939] hover:bg-[#FFF0F0] rounded-lg cursor-pointer outline-none transition-colors"
    >
      <LogOut className="w-4 h-4" />
      退出登录
    </DropdownMenu.Item>
  );
}
