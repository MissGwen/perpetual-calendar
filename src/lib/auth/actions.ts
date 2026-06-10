'use server';

import { signIn, signOut } from '@/src/lib/auth';

export async function signInWithGitHubAction() {
  await signIn('github');
}

export async function signOutAction() {
  await signOut();
}
