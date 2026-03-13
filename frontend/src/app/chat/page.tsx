"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Camera } from "lucide-react";
import ChatBubble from "@/component/chat";
import { mockChatRooms } from "@/mockup_data/chat";

export default function ChatPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false); // 로그인 상태도 state로 관리

  const roomData = mockChatRooms[0];

  useEffect(() => {
    // [수정] 브라우저 환경에서만 localStorage에 접근하도록 useEffect 내부에서 처리
    const leaderStatus = localStorage.getItem("isLeader") === "true";
    const loginStatus = localStorage.getItem("isLogin") === "true";
    
    setIsLeader(leaderStatus);
    setIsLogin(loginStatus);

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // [수정] 빌드 시 에러를 방지하기 위해 로직을 State 기반으로 변경
  const checkIsMe = (senderId: number) => {
    if (!isLogin) return false;

    if (isLeader) {
      // 내가 방장일 때: 데이터의 방장 ID(1)가 '나'
      return senderId === 1;
    } else {
      // 내가 참여자일 때: 데이터의 참여자 ID(999)가 '나'
      return senderId === 999;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white md:bg-gray-50 overflow-hidden font-sans">
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-gray-900 leading-tight line-clamp-1">
              {roomData.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center overflow-hidden relative">
        <div 
          ref={scrollRef}
          className="flex-1 w-full overflow-y-auto px-6 py-4 space-y-2 no-scrollbar scroll-smooth"
        >
          {roomData.messages.map((msg) => {
            if (msg.isSystem) {
              const isLockerInfo = msg.content.includes("🔐");
              return (
                <div key={msg.id} className="flex justify-center my-8 px-4">
                  <span className={`px-6 py-3 rounded-[1.5rem] text-[11px] font-black uppercase tracking-tighter border shadow-lg transition-all ${
                    isLockerInfo 
                    ? "bg-blue-600 text-white border-blue-500 shadow-blue-100 scale-105" 
                    : "bg-gray-100 text-gray-400 border-gray-50"
                  }`}>
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <ChatBubble 
                key={msg.id}
                senderName={msg.senderName}
                content={msg.content}
                timestamp={msg.timestamp}
                isSender={checkIsMe(msg.senderId)}
              />
            );
          })}
        </div>

        <div className="w-full p-6 bg-white border-t border-gray-50 z-10">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <button className="p-4 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:text-blue-600 transition-colors shadow-sm active:scale-95">
              <Camera size={20} />
            </button>
            
            <div className="relative flex-1 flex items-center bg-gray-50 rounded-[1.8rem] border border-gray-100 p-1 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input 
                type="text" 
                placeholder={isLeader ? "참여자들에게 안내 메시지를 보내세요..." : "방장에게 메시지를 보내세요..."}
                className="flex-1 bg-transparent pl-5 pr-12 py-3.5 text-sm font-bold outline-none placeholder:text-gray-300"
              />
              <button className="absolute right-1.5 p-3 bg-gray-900 text-white rounded-[1.2rem] hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}