import { apiSlice } from "../apiSlice";

export const categoryAPISlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/api/categories",
            }),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryAPISlice;