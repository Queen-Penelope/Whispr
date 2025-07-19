import {create} from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  //Checking authorization
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();

    } catch (error) {
      console.log("Error is checkAuth: ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //Signing Up
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data); 
      set({ authUser: res.data });
      toast.success("Sign Up Successful!");
      get().connectSocket();

    } catch (error) {
      console.log("SIGNUP ERROR →", error);
      toast.error(error?.response?.data?.message || error.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  //Loging in
  login: async (data) => {
    set({ isLoggingIn: true});
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({authUser: res.data});
      toast.success("Logged in successfully!")

      get().connectSocket();
    } catch (error) {
      console.log("LOGIN ERROR →", error);
      toast.error(error?.response?.data?.message || error.message || "Login failed");
    } finally {
      set({ isLoggingIn : false });
    }
  },

  //Loging out
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //updating PDP
  updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("auth/update-profile", data);
    
    set({ authUser: res.data }); // ✅ backend must return updated user here

    toast.success("Profile Updated Successfully!");
  } catch (error) {
    console.log("error in updateProfile", error);
    toast.error(error.response?.data?.message || "Profile update failed.");
  } finally {
    set({ isUpdatingProfile: false });
  }
  },

  //Connection with socket.io-client
  connectSocket: () =>  {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL,{
      query:{
        userId: authUser._id,
      }
    });

    socket.connect();

    set({socket: socket});

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds});
    })
  },

  //Disconnection from socket.io-client
  disconnectSocket: () => {
  const socket = get().socket;
  if (socket && socket.connected) {
    console.log("Disconnecting socket:", socket.id);
    socket.disconnect();
    set({ socket: null });
  } 
}

  
}));