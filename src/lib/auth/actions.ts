'use server';

import { signIn, signOut } from '@/lib/auth';

export async function signInWithGitHubAction() {
  await signIn('github');
}

export async function signOutAction() {
  await signOut();
}
