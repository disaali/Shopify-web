"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Send, Bot, User, ShoppingCart, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
  selected_product?: any;
};

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I am your AI shopping assistant. What are you looking for today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a random session ID for the chat
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        session_id: sessionId,
        message: userMsg,
      });
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: res.data.response,
          selected_product: res.data.selected_product
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error: " + (err.response?.data?.detail || err.message) }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex flex-shrink-0 items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              msg.role === "user" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-900"
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              
              {msg.selected_product && msg.selected_product.id && (
                <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{msg.selected_product.name}</h4>
                    <p className="text-gray-600 font-medium mt-1">Rs. {msg.selected_product.price?.toLocaleString()}</p>
                    <div className="flex gap-2 mt-2 text-sm text-gray-500">
                      <span>{msg.selected_product.storage}</span> • 
                      <span>{msg.selected_product.ram}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link 
                      href={`/products/${msg.selected_product.id}`}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
                    >
                      <Info className="w-4 h-4" /> Details
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex flex-shrink-0 items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-5 py-3 flex items-center">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <form onSubmit={sendMessage} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-3 px-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12 shadow-sm"
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
