'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/authApi';
import { useAuthStore } from '@/store/authStore';

export function useLogout(): () => Promise<void> {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useCallback(async () => {
    try {
      await logout();
    } finally {
      // Local state must be cleared even if the backend call fails
      clearAuth();
      router.push('/');
      router.refresh();
    }
  }, [clearAuth, router]);
}
