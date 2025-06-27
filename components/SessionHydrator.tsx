'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/useAuthStore';

export const SessionHydrator = () => {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
        console.log(session,"session")
      setUser({
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
      });
    }

    if (status === 'unauthenticated') {
      setUser(null); // Clear on logout
    }
  }, [status, session, setUser]);

  return null; // nothing visual
};
