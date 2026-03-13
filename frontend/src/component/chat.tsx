"use client";

import { useState } from "react";
import { User, ShieldCheck, CheckCircle2, History } from "lucide-react";

interface ChatBubbleProps {
  senderName: string;
  content: string;
  timestamp: string;
  isSender: boolean;
}

export default function ChatBubble({ senderName, content, timestamp, isSender }: ChatBubbleProps) {
  const [showReliability, setShowReliability] = useState(false);

  // 제공해주신 신뢰도 지표 데이터
  const reliability = {
    carpoolSuccessRate: 98.5,
    settlementRate: 100,
    cleanTradeRate: 100,
  };

  return (
    <div className={`flex w-full ${isSender ? "justify-end" : "justify-start"} items-end gap-2 mb-6 relative`}>
      {/* 1. 프로필 버튼 및 신뢰도 팝오버 */}
      {!isSender && (
        <div className="relative flex-shrink-0 mb-5">
          <button 
            onClick={() => setShowReliability(!showReliability)}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm border ${
              showReliability ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-100 text-blue-600 hover:border-blue-300"
            }`}
          >
            <User size={20} />
          </button>

          {/* 신뢰도 지표 팝오버 UI */}
          {showReliability && (
            <div className="absolute bottom-full left-0 mb-3 w-56 bg-gray-900 text-white rounded-[1.5rem] p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                <ShieldCheck size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Trust Metrics</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold opacity-60 flex items-center gap-1.5"><History size={10}/> 이행률</span>
                  <span className="text-xs font-black">{reliability.carpoolSuccessRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold opacity-60 flex items-center gap-1.5"><CheckCircle2 size={10}/> 정산율</span>
                  <span className="text-xs font-black">{reliability.settlementRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold opacity-60 flex items-center gap-1.5"><ShieldCheck size={10}/> 클린거래</span>
                  <span className="text-xs font-black">{reliability.cleanTradeRate}%</span>
                </div>
              </div>

              {/* 삼각형 꼬리 */}
              <div className="absolute top-full left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900" />
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[75%]`}>
        {/* 이름 표시 */}
        {!isSender && (
          <span className="text-[10px] font-black text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">
            {senderName}
          </span>
        )}
        
        {/* 말풍선 본체 */}
        <div className={`p-4 rounded-[1.8rem] text-sm font-bold leading-relaxed shadow-sm ${
          isSender 
          ? "bg-blue-600 text-white rounded-tr-none" 
          : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
        }`}>
          {content}
        </div>
        
        {/* 시간 정보 */}
        <span className="text-[9px] font-black text-gray-300 mt-1.5 uppercase italic px-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
}