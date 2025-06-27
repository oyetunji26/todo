import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signOut } from 'next-auth/react';

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  teams?: string[]
};

type AuthStore = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      setUser: (user) => set({ user, isLoggedIn: !!user }),

      logout: () => {
        // Clear Zustand state
        set({ user: null, isLoggedIn: false });

        // Also sign out from NextAuth (optional, you can remove this if using credentials only)
        signOut({ redirect: true, callbackUrl: '/auth' });
      },
    }),
    {
      name: 'auth-storage', // localStorage key name
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
