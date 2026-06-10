import { auth, signIn, signOut } from '@/src/lib/auth';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { SignOutMenuItem } from './SignOutMenuItem';

export async function Header() {
  const session = await auth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 font-sans selection:bg-[#BE3939] selection:text-white">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-linear-to-r from-[#BE3939]/80 via-[#BE3939] to-[#BE3939]/80"></div>

      <header className="w-full bg-[#FDFCF9]/50 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-50">
        <div className="max-w-360 mx-auto px-6 lg:px-10 h-19 flex items-center justify-between">
          {/* Left: Logo Area */}
          <div className="flex items-center gap-4 group cursor-pointer">
            {/* Traditional Stamp Logo */}
            <div className="relative w-11 h-11 flex items-center justify-center bg-[#BE3939] rounded-sm shadow-sm transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0.75 border border-[#FDFCF9]/40 rounded-xs" />
              <span className="text-[#FDFCF9] font-serif text-2xl font-bold -translate-y-px select-none">
                历
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[26px] font-serif text-[#3A332C] font-bold tracking-[0.2em] leading-none mb-1.5 group-hover:text-[#BE3939] transition-colors">
                万年历
              </h1>
              <span className="text-[11px] text-[#A69B8D] tracking-[0.18em] uppercase leading-none font-medium">
                Chinese Almanac
              </span>
            </div>
          </div>

          {/* Right: Actions Area */}
          <div className="flex items-center">
            {session?.user ? (
              <div className="flex items-center gap-5">
                {/* Notifications */}
                <button className="relative p-2.5 text-[#8C8273] hover:text-[#BE3939] hover:bg-[#F5EFE6] rounded-full transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#BE3939] rounded-full border-2 border-[#FDFCF9]"></span>
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-[#EBE5D9]"></div>

                {/* User Dropdown */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="group flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-[#F5EFE6] border border-transparent hover:border-[#EBE5D9] transition-all duration-200 outline-none">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={`${session.user.name || 'User'} avatar`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border-2 border-[#EBE5D9] group-hover:border-[#BE3939]/50 transition-colors"
                        />
                      )}
                      <div className="flex flex-col items-start sm:flex">
                        <span className="text-[#4A433A] font-medium text-sm leading-none mb-1.5 group-hover:text-[#BE3939] transition-colors">
                          {session.user.name}
                        </span>
                        <span className="text-[#A69B8D] text-[11px] leading-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BE3939]/70 inline-block"></span>
                          GitHub
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[#A69B8D] group-hover:text-[#BE3939] transition-colors ml-1" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-50 z-50 bg-[#FDFCF9] rounded-xl shadow-lg border border-[#EBE5D9] p-2 mt-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                      sideOffset={8}
                      align="end"
                    >
                      <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#4A433A] hover:bg-[#F5EFE6] hover:text-[#BE3939] rounded-lg cursor-pointer outline-none transition-colors">
                        <User className="w-4 h-4" />
                        个人主页
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#4A433A] hover:bg-[#F5EFE6] hover:text-[#BE3939] rounded-lg cursor-pointer outline-none transition-colors">
                        <Settings className="w-4 h-4" />
                        偏好设置
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-[#EBE5D9] my-1.5 mx-2" />
                      <SignOutMenuItem />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            ) : (
              <form
                action={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <button
                  type="submit"
                  className="group relative px-8 py-2.5 bg-[#F5EFE6] border border-[#EBE5D9] overflow-hidden rounded-md hover:shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <div className="absolute inset-0 bg-[#BE3939] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 text-[#4A433A] group-hover:text-[#FDFCF9] text-sm font-medium tracking-widest transition-colors duration-300">
                    登录
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
