import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()
  console.log({onlineUsers})
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);
  if(isCheckingAuth  && !authUser) return (
     <div className="flex justify-center items-center h-full">
       <Loader className="animate-spin text-blue-500 text-success" size={48} />
    </div>
  )

  return (
    <div data-theme  = {theme}> 
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
