'use client';

import { signOutAction } from '@/lib/auth/actions';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react';

export function SignOutMenuItem() {
  return (
    <form action={signOutAction}>
      <DropdownMenu.Item asChild>
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-brand outline-none transition-colors hover:bg-brand-soft"
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </DropdownMenu.Item>
    </form>
  );
}
