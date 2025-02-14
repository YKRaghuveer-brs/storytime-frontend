import { apiSlice } from "../apiSlice";

export const languageAPISlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getLanguages: builder.query({
            query: () => ({
                url: "/api/languages",
            }),
        }),
    }),
});

export const { useGetLanguagesQuery } = languageAPISlice;