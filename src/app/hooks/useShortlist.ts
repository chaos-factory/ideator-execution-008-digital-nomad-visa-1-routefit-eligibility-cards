import { useState, useCallback } from 'react';

export function useShortlist() {
  const [shortlist, setShortlist] = useState<Set<string>>(new Set());

  const toggleShortlist = useCallback((programId: string) => {
    setShortlist(prev => {
      const next = new Set(prev);
      if (next.has(programId)) {
        next.delete(programId);
      } else {
        next.add(programId);
      }
      return next;
    });
  }, []);

  const clearShortlist = useCallback(() => {
    setShortlist(new Set());
  }, []);

  const isShortlisted = useCallback(
    (programId: string) => shortlist.has(programId),
    [shortlist]
  );

  return {
    shortlist: Array.from(shortlist),
    toggleShortlist,
    clearShortlist,
    isShortlisted,
    count: shortlist.size,
  };
}
