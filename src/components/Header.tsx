import { auth, signIn, signOut } from '@/src/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/50 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-primary tracking-wide"></Link>

        <div>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {session.user.name}
              </span>
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={`${session.user.name || 'User'} avatar`}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">
                  {session.user.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  退 出
                </button>
              </form>
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
                className="text-sm px-4 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              >
                登 录
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
