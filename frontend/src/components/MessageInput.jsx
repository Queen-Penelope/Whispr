import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react"; // 👈 install this first

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 👈 emoji toggle
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSending) return;

    try {
      setIsSending(true);
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
      setShowEmojiPicker(false); // close picker after send
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-4 w-full relative">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center relative">
          <input
            type="text"
            disabled={isSending}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* 📷 Image Picker */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            disabled={isSending}
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

          {/* 😄 Emoji Button */}
          <button
            type="button"
            disabled={isSending}
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile size={20} />
          </button>

          {/* 👇 Emoji Popup */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                previewConfig={{ showPreview: false }} // 🚫 hide the bottom preview
                searchDisabled={true} // 🚫 hide the search bar
                skinTonesDisabled={true} // optional: if you don’t want skin tone selectors
                emojiStyle="native" // or use "apple" or "facebook" depending on your vibe
                theme="auto"
              />
            </div>
          )}
        </div>

        {/* 📨 Send */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isSending}
        >
          {isSending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
