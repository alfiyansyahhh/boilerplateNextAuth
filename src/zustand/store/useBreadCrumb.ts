// stores/breadcrumb.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbState = {
  crumbs: Crumb[];
  setCrumbs: (crumbs: Crumb[]) => void;
  addCrumbs: (crumbs: Crumb) => void;
  reset: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>()(
  persist(
    (set, get) => ({
      crumbs: [],
      setCrumbs: (crumbs) => {
        set({ crumbs });
      },
      addCrumbs: (crumb) =>
        set((state) => {
          const exists = state.crumbs.some(
            (c) => (c.href && c.href === crumb.href) || c.label === crumb.label
          );

          if (exists) return state;

          return {
            crumbs: [...state.crumbs, crumb],
          };
        }),
      reset: () => set({ crumbs: [] }),
    }),
    {
      name: 'breadcrumb-storage',
      partialize: (state) => {
        const { setCrumbs, addCrumbs, reset, ...rest } = state;
        return rest;
      },
    }
  )
);
