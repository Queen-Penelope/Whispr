import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen w-full bg-base-200 pt-[4.5rem] pb-4 px-4 flex justify-center items-start">
      <div className="w-full max-w-6xl h-[calc(100vh-6rem)] bg-base-100 rounded-xl shadow-xl flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat Area */}
        <div className="flex-1 h-full">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
