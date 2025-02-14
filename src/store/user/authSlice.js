/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const userData = JSON.parse(localStorage.getItem("userdata")) || null
const token = JSON.parse(localStorage.getItem("token")) || null
const spotifyToken = JSON.parse(localStorage.getItem("spotifyToken")) || null

const isSuspended= false
const isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false
const initialState = {
    token,
    spotifyToken,
    isLoggedIn : !!token,
    userData,
    isSidebarOpen: false,
    isSidebarMinimized: false,
    storyInfo: {name: null, id: null},

    isSuspended,
    isAdmin,
    
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.Token;
            localStorage.setItem("token", JSON.stringify(action.payload.Token));
            state.spotifyToken = action.payload.spotifyToken.access_token;
            localStorage.setItem("spotifyToken", JSON.stringify(action.payload.spotifyToken.access_token));
            state.isLoggedIn = true;
            state.isAdmin = action.payload.isAdmin;
            localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
           
        },
        register: (state, action) => {
            state.token = action.payload.message;
        },
        forgotPassword: (state, action) => {
            state.token = action.payload.message;
        },
        setUserProfile: (state, action) => {
            state.userData = action.payload.profileData;
            localStorage.setItem("userdata", JSON.stringify(action.payload.profileData));
        },
       
        toggleLanguageSelection: (state, action) => {
            if (state.userData.languages.includes(action.payload)) {
                state.userData.languages = state.userData.languages.filter(
                  (language) => language !== action.payload
                );
              } else {
                state.userData.languages.push(action.payload);
              }
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = true;
            state.isSidebarMinimized = true;
        },
        toggleCloseSidebar: (state) => {
            state.isSidebarOpen = false;
            state.isSidebarMinimized = false;
        },
        toggleSidebarMinimize: (state) => {
            state.isSidebarMinimized = !state.isSidebarMinimized;
        },
        setStoryInfo: (state, action) => {
            state.storyInfo.id = action.payload.s_id;
            state.storyInfo.name = action.payload.s_name;
        },
        updateSpotifyToken: (state, action) => {
            state.spotifyToken = action.payload.spotifyToken.access_token;
            localStorage.setItem("spotifyToken", JSON.stringify(action.payload.spotifyToken.access_token));
        },
        logout: (state, action) => {
            state.token = null;
            state.spotifyToken = null;
            state.isLoggedIn = false;
            state.userData = null;
            state.isSidebarOpen = null;
            state.isSidebarMinimized = null;
            state.isAdmin = false;
            localStorage.removeItem("token");
            localStorage.removeItem("spotifyToken");
            localStorage.removeItem("userdata");
            localStorage.removeItem("isAdmin");
            localStorage.clear();
         
            
        },
        
    },
})

export const {
    login, 
    register, 
    logout, 
    forgotPassword, 
    setUserProfile, 
    toggleLanguageSelection,
    toggleSidebar,
    toggleSidebarMinimize,
    toggleCloseSidebar,
    setStoryInfo,
    updateSpotifyToken,
} = authSlice.actions;

export default authSlice.reducer;