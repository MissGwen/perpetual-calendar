'use client';

import { signInWithGitHubAction } from '@/lib/auth/actions';
import { Bell, ChevronDown, Eye, EyeOff, Settings, User, X } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import type { Session } from 'next-auth';
import { useEffect, useState, type SubmitEvent } from 'react';
import { SignOutMenuItem } from './sign-out-menu-item';

type AuthView = 'login' | 'register';

type HeaderClientProps = {
  session: Session | null;
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.08-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.74.11 3.03.73.81 1.18 1.83 1.18 3.08 0 4.4-2.68 5.37-5.24 5.65.41.35.78 1.03.78 2.08v3.09c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function UserAvatar({ session, name }: { session: Session; name: string }) {
  if (session.user?.image) {
    return (
      <Image
        src={session.user.image}
        alt={`${name} avatar`}
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 rounded-full border-2 border-ink-100 object-cover transition-colors group-hover:border-brand/50"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-100 bg-cream text-sm font-medium text-ink-700 transition-colors group-hover:border-brand/50 group-hover:text-brand">
      {name.slice(0, 1)}
    </div>
  );
}

export function HeaderClient({ session }: HeaderClientProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const isLoggedIn = Boolean(session?.user);
  const displayName = session?.user?.name || '用户';

  useEffect(() => {
    if (!authOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAuthOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authOpen]);

  function handlePlaceholderSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function switchView(nextView: AuthView) {
    setView(nextView);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAccount('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  }

  return (
    <div className="sticky top-0 z-50 font-sans selection:bg-brand selection:text-white">
      <div className="h-1 w-full bg-linear-to-r from-brand/80 via-brand to-brand/80" />

      <header className="w-full border-b border-ink-100 bg-parchment/60 backdrop-blur-md">
        <div className="mx-auto flex h-19 max-w-360 items-center justify-between px-6 lg:px-10">
          <div className="group flex cursor-pointer items-center gap-4">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-sm bg-brand shadow-sm transition-all duration-300 group-hover:rotate-0 group-hover:scale-105 -rotate-2">
              <div className="absolute inset-0.75 rounded-xs border border-parchment/40" />
              <span className="-translate-y-px select-none font-serif text-2xl font-bold text-parchment">
                历
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-1.5 text-[26px] leading-none font-serif font-bold tracking-[0.2em] text-ink-800 transition-colors group-hover:text-brand">
                万年历
              </h1>
              <span className="text-[11px] leading-none font-medium tracking-[0.18em] text-ink-400 uppercase">
                Chinese Almanac
              </span>
            </div>
          </div>

          <div className="flex items-center">
            {isLoggedIn && session ? (
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  className="relative rounded-full p-2.5 text-ink-500 transition-all duration-200 hover:bg-cream hover:text-brand"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-parchment bg-brand" />
                </button>

                <div className="h-6 w-px bg-ink-100" />

                <DropdownMenu.Root modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="group flex items-center gap-3 rounded-full border border-transparent p-1.5 pr-4 outline-none transition-all duration-200 hover:border-ink-100 hover:bg-cream"
                    >
                      <UserAvatar session={session} name={displayName} />
                      <div className="hidden items-start sm:flex sm:flex-col">
                        <span className="mb-1.5 text-sm leading-none font-medium text-ink-700 transition-colors group-hover:text-brand">
                          {displayName}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] leading-none text-ink-400">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand/70" />
                          GitHub
                        </span>
                      </div>
                      <ChevronDown className="ml-1 h-4 w-4 text-ink-400 transition-colors group-hover:text-brand" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="z-50 mt-2 min-w-50 rounded-xl border border-ink-100 bg-parchment p-2 shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                      sideOffset={8}
                      align="end"
                    >
                      <DropdownMenu.Item
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-ink-700 outline-none transition-colors hover:bg-cream hover:text-brand"
                        onSelect={(event) => event.preventDefault()}
                      >
                        <span className="flex items-center gap-3">
                          <User className="h-4 w-4" />
                          个人主页
                        </span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-ink-700 outline-none transition-colors hover:bg-cream hover:text-brand"
                        onSelect={(event) => event.preventDefault()}
                      >
                        <span className="flex items-center gap-3">
                          <Settings className="h-4 w-4" />
                          偏好设置
                        </span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="mx-2 my-1.5 h-px bg-ink-100" />
                      <SignOutMenuItem />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="group relative flex items-center justify-center overflow-hidden rounded-md border border-ink-100 bg-cream px-8 py-2.5 transition-all duration-300 hover:shadow-md"
              >
                <div className="absolute inset-0 translate-y-full bg-brand transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 text-sm font-medium tracking-widest text-ink-700 transition-colors duration-300 group-hover:text-parchment">
                  登录
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {authOpen ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setAuthOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-105 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-ink-100 bg-parchment shadow-2xl animate-in fade-in-0 zoom-in-95">
            <div className="h-1 w-full bg-linear-to-r from-brand/60 via-brand to-brand/60" />

            <div className="p-8">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <div className="mb-1.5 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 rotate-[-4deg] items-center justify-center rounded-[3px] bg-brand shadow-sm">
                      <span className="select-none font-serif text-sm font-bold text-parchment">
                        历
                      </span>
                    </div>
                    <span className="font-serif text-[17px] font-bold tracking-[0.15em] text-ink-800">
                      万年历
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-wide text-ink-800">
                    {view === 'login' ? '欢迎回来' : '创建账号'}
                  </h2>
                  <p className="mt-0.5 text-[13px] tracking-wide text-ink-400">
                    {view === 'login' ? '登录以使用完整功能' : '注册一个新账号开始体验'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAuthOpen(false)}
                  className="-mt-1 -mr-1 rounded-lg p-1.5 text-ink-400 transition-all hover:bg-cream hover:text-brand"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* 账号体系后续接入真实服务端逻辑，这里先保留设计稿交互与结构。 */}
              <form onSubmit={handlePlaceholderSubmit} className="space-y-4">
                {view === 'register' ? (
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-ink-700">
                      用户名
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="请输入用户名"
                      className="w-full rounded-lg border border-ink-100 bg-cream px-4 py-2.5 text-sm text-ink-800 transition-all placeholder:text-ink-300 focus:border-brand/60 focus:bg-parchment focus:outline-none"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-ink-700">
                    {view === 'login' ? '账号' : '邮箱'}
                  </label>
                  <input
                    type={view === 'login' ? 'text' : 'email'}
                    value={account}
                    onChange={(event) => setAccount(event.target.value)}
                    placeholder={view === 'login' ? '请输入账号或邮箱' : '请输入邮箱地址'}
                    className="w-full rounded-lg border border-ink-100 bg-cream px-4 py-2.5 text-sm text-ink-800 transition-all placeholder:text-ink-300 focus:border-brand/60 focus:bg-parchment focus:outline-none"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-[13px] font-medium tracking-wide text-ink-700">
                      密码
                    </label>
                    {view === 'login' ? (
                      <button
                        type="button"
                        className="text-[12px] tracking-wide text-brand/80 transition-colors hover:text-brand"
                      >
                        忘记密码？
                      </button>
                    ) : null}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="请输入密码"
                      className="w-full rounded-lg border border-ink-100 bg-cream px-4 py-2.5 pr-11 text-sm text-ink-800 transition-all placeholder:text-ink-300 focus:border-brand/60 focus:bg-parchment focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 transition-colors hover:text-brand"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {view === 'register' ? (
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-ink-700">
                      确认密码
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="请再次输入密码"
                        className="w-full rounded-lg border border-ink-100 bg-cream px-4 py-2.5 pr-11 text-sm text-ink-800 transition-all placeholder:text-ink-300 focus:border-brand/60 focus:bg-parchment focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 transition-colors hover:text-brand"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="group relative mt-1 w-full overflow-hidden rounded-lg bg-brand py-2.5 transition-all duration-200 hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-brand-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="relative z-10 text-sm font-medium tracking-widest text-parchment">
                    {view === 'login' ? '登　录' : '注　册'}
                  </span>
                </button>
              </form>

              <p className="mt-4 text-center text-[13px] text-ink-500">
                {view === 'login' ? (
                  <>
                    还没有账号？{' '}
                    <button
                      type="button"
                      onClick={() => switchView('register')}
                      className="font-medium text-brand transition-colors hover:underline"
                    >
                      立即注册
                    </button>
                  </>
                ) : (
                  <>
                    已有账号？{' '}
                    <button
                      type="button"
                      onClick={() => switchView('login')}
                      className="font-medium text-brand transition-colors hover:underline"
                    >
                      返回登录
                    </button>
                  </>
                )}
              </p>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-ink-100" />
                <span className="shrink-0 text-[12px] tracking-widest text-ink-300">
                  第三方登录
                </span>
                <div className="h-px flex-1 bg-ink-100" />
              </div>

              <div className="flex gap-3">
                <form action={signInWithGitHubAction} className="flex-1">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2.5 rounded-lg border border-ink-100 bg-cream py-2.5 transition-all duration-200 hover:border-ink-200 hover:bg-cream-hover"
                  >
                    <GitHubIcon />
                    <span className="text-[13px] font-medium text-ink-700 transition-colors group-hover:text-ink-800">
                      GitHub
                    </span>
                  </button>
                </form>

                <button
                  type="button"
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-ink-100 bg-cream py-2.5 transition-all duration-200 hover:border-ink-200 hover:bg-cream-hover"
                >
                  <GoogleIcon />
                  <span className="text-[13px] font-medium text-ink-700 transition-colors group-hover:text-ink-800">
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
