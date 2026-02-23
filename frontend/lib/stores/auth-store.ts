'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';

type AuthState = {
  user: User | null;
  access: string | null;
  refresh: string | null;
  setAuth: (args: { user: User; access: string; refresh: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access: null,
      refresh: null,
      setAuth: ({ user, access, refresh }) => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        set({ user, access, refresh });
      },
      clearAuth: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        set({ user: null, access: null, refresh: null });
      },
    }),
    { name: 'sf-auth' }
  )
);
