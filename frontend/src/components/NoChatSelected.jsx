import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-base-100/50">
      <div className="max-w-xl text-center space-y-8 px-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce shadow-lg">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-base-content">Welcome to Whispr</h2>
        <p className="text-base text-base-content/60">
          Select a user from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
