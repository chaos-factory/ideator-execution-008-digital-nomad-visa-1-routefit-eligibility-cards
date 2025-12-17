import { useState, useEffect } from 'react';

const SHORTLIST_KEY = 'routefit_shortlist';

export function useShortlist() {
  const [shortlist, setShortlistState] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SHORTLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SHORTLIST_KEY, JSON.stringify(shortlist));
  }, [shortlist]);

  const addToShortlist = (programId: string) => {
    setShortlistState(prev => 
      prev.includes(programId) ? prev : [...prev, programId]
    );
  };

  const removeFromShortlist = (programId: string) => {
    setShortlistState(prev => prev.filter(id => id !== programId));
  };

  const toggleShortlist = (programId: string) => {
    if (shortlist.includes(programId)) {
      removeFromShortlist(programId);
    } else {
      addToShortlist(programId);
    }
  };

  const clearShortlist = () => {
    setShortlistState([]);
  };

  const isInShortlist = (programId: string) => {
    return shortlist.includes(programId);
  };

  return {
    shortlist,
    addToShortlist,
    removeFromShortlist,
    toggleShortlist,
    clearShortlist,
    isInShortlist,
  };
}
