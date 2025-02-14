import { apiSlice } from "../apiSlice";

const USER_ENDPOINT = "/api/users";

const adminAPISlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        getUserProfilesAPI : builder.query({
            query: (data) => ({
                url: `${USER_ENDPOINT}/profiles`,
                method: "get",
                body: data,
            }),
        }),
        getAdminProfilesAPI : builder.query({
            query: (data) => ({
                url: `${USER_ENDPOINT}/adminprofiles`,
                method: "get",
                body: data,
            }),
        }),
        updateUserProfilesAPI : builder.mutation({
            query: (data) => ({
                url: `${USER_ENDPOINT}/profiles`,
                method: "POST",
                body: data,
            }),
        }),
        DeleteProfilesAPI : builder.mutation({
            query: (data) => ({
                url: `${USER_ENDPOINT}/deleteprofile`,
                method: "POST",
                body: data,
            }),
        }),

        addLanguagesAPI : builder.mutation({
            query: (data) => ({
                url: `api/languages`,
                method: "POST",
                body: data,
            }),
        }),

        updateLanguagesAPI : builder.mutation({
            query: (data) => ({
                url: `api/languages`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteLanguagesAPI : builder.mutation({
            query: (data) => ({
                url: `api/languages`,
                method: "DELETE",
                body: data,
            }),
        }),


        addCategoryAPI : builder.mutation({
            query: (data) => ({
                url: `api/categories`,
                method: "POST",
                body: data,
            }),
        }),

        updateCategoryAPI : builder.mutation({
            query: (data) => ({
                url: `api/categories`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteCategoryAPI : builder.mutation({
            query: (data) => ({
                url: `api/categories`,
                method: "DELETE",
                body: data,
            }),
        }),
        
    }),
});

export const {
    useGetUserProfilesAPIQuery,
    useGetAdminProfilesAPIQuery,
    useUpdateUserProfilesAPIMutation,
    useDeleteProfilesAPIMutation,

    useAddLanguagesAPIMutation,
    useUpdateLanguagesAPIMutation,
    useDeleteLanguagesAPIMutation,

    useAddCategoryAPIMutation,
    useUpdateCategoryAPIMutation,
    useDeleteCategoryAPIMutation,
} = adminAPISlice