import { create } from "zustand";

export const usePagesStore = create((set, get) => ({
    // state
    pages: [],
    pagesBySlug: {},
    loading: false,
    error: null,

    // actions
    setPages: (pages) => {
        const pagesBySlug = pages.reduce((acc, page) => {
            acc[page.slug] = page;
            return acc;
        }, {});

        set({
            pages,
            pagesBySlug,
            loading: false,
            error: null,
        });
    },

    fetchPages: async () => {
        set({ loading: true, error: null });

        try {
            const res = await fetch("/api/pages"); // your backend endpoint
            const data = await res.json();

            get().setPages(data);
        } catch (err) {
            set({
                loading: false,
                error: err.message || "Failed to fetch pages",
            });
        }
    },

    getPageBySlug: (slug) => {
        return get().pagesBySlug[slug];
    },
}));
