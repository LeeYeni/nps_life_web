"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  MessageCircle, 
  Inbox,
  LayoutGrid,
  Tag
} from "lucide-react";

export default function MyMeetingPage() {
  const router = useRouter();
  const [joinedMeetings, setJoinedMeetings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("전체");

  // 1. 데이터 로드 (클라이언트 사이드 전용)
  useEffect(() => {
    const saved = localStorage.getItem("joinedMeetings");
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // 배열인지 확인 후 상태 업데이트
        if (Array.isArray(parsedData)) {
          setJoinedMeetings(parsedData);
        }
      } catch (e) {
        console.error("데이터 파싱 오류:", e);
      }
    }
  }, []);

  // 2. 카테고리 추출 (useMemo를 사용하여 성능 최적화 및 안정성 확보)
  const categories = useMemo(() => {
    // 기본값 "전체" 포함
    const base = ["전체"];
    
    // 데이터에서 유효한 category 추출
    const dynamicCategories = joinedMeetings
      .map((m) => m.category)
      .filter((cat): cat is string => Boolean(cat)); // null, undefined, "" 제거

    // 중복 제거 후 합치기
    return [...base, ...Array.from(new Set(dynamicCategories))];
  }, [joinedMeetings]);

  // 3. 필터링 로직
  const filteredMeetings = useMemo(() => {
    if (activeTab === "전체") return joinedMeetings;
    return joinedMeetings.filter((m) => m.category === activeTab);
  }, [activeTab, joinedMeetings]);

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl transition-transform hover:rotate-12">
                <LayoutGrid className="text-blue-600" size={20} />
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter">내 모임</h1>
            </div>
          </div>
          
          {/* 카테고리 탭 영역 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all uppercase tracking-tighter shadow-sm ${
                  activeTab === cat 
                  ? "bg-blue-600 text-white shadow-blue-100 scale-105" 
                  : "bg-white text-gray-400 border border-gray-100 hover:border-blue-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {filteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredMeetings.map((meeting, idx) => (
              <div 
                key={`${meeting.id}-${idx}`}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-5 duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-blue-600 text-white px-2.5 py-1 rounded-lg">
                        <Tag size={10} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {meeting.category || "공구"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                      {meeting.title}
                    </h3>
                  </div>
                  
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-9 h-9 rounded-2xl border-4 border-white bg-gray-50 flex items-center justify-center shadow-sm overflow-hidden">
                        <div className="w-full h-full bg-blue-50 text-blue-400 flex items-center justify-center text-[11px] font-black italic">
                          U
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <button 
                    onClick={() => router.push('/chat')}
                    className="w-full flex items-center justify-center gap-2 py-5 bg-gray-900 text-white rounded-[1.8rem] text-sm font-black hover:bg-blue-600 transition-all active:scale-95 shadow-2xl shadow-gray-200 group-hover:translate-y-[-2px]"
                  >
                    <MessageCircle size={18} /> 
                    실시간 톡방 입장하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center space-y-5 bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-200">
              <Inbox size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-gray-900 font-black text-lg tracking-tight uppercase italic">No Activity</p>
              <p className="text-gray-400 font-bold text-sm tracking-tighter">참여 중인 {activeTab} 모임이 없습니다.</p>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              모임 찾으러 가기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}