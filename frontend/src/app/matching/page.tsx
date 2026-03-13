"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Navigation, MapPin, Search, Car, ShieldCheck, 
  Bluetooth, Info, Plus, ArrowRight, Loader2, X, Star
} from "lucide-react";

// 데이터 임포트
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import { persona4 } from "@/mockup_data/persona4";
import { mockMatchingRooms, suggestedCandidates } from "@/mockup_data/matching";

export default function MatchingPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"matching" | "register">("matching");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  // 상태 관리
  const [isCarVerified, setIsCarVerified] = useState(false);
  const [isMatching, setIsMatching] = useState(false); 
  const [showResult, setShowResult] = useState(false); 

  // 버튼 활성화 조건 (출발지, 목적지 모두 입력 시)
  const isFormValid = origin.trim() !== "" && destination.trim() !== "";

  useEffect(() => {
    const personaKey = localStorage.getItem("persona");
    const personaMap: Record<string, any> = { persona1, persona2, persona3, persona4 };
    const currentPersona = personaMap[personaKey || ""];

    if (currentPersona?.user?.verification) {
      const { efine, car365, identity } = currentPersona.user.verification;
      setIsCarVerified(efine && car365 && identity);
    }
  }, []);

  // [1. 매칭 시작 로직 - 참여자용]
  const handleStartMatching = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setShowResult(true);
    }, 5000);
  };

  // [2. 카풀 경로 등록 로직 - 방장용]
  const handleRegisterRoute = () => {
    setIsMatching(true); // 등록 애니메이션 시뮬레이션
    
    setTimeout(() => {
      const newRoom = {
        ...mockMatchingRooms[0], // 기본 카풀 목업 데이터 기반
        id: `route-${Date.now()}`,
        origin,
        destination,
        status: 'WAITING_FOR_RIDE', // 등록 즉시 대기 상태
        participants: [
          {
            ...mockMatchingRooms[0].participants[0], // Persona 1 (방장) 정보
            status: 'WAITING'
          }
        ],
        createdAt: new Date().toISOString()
      };

      const saved = localStorage.getItem("joinedMeetings");
      const meetings = saved ? JSON.parse(saved) : [];
      
      // 방장 권한으로 저장
      meetings.push({
        ...newRoom,
        category: "모빌리티",
        role: "LEADER" 
      });
      
      localStorage.setItem("joinedMeetings", JSON.stringify(meetings));
      window.dispatchEvent(new Event("joinedMeetingsUpdate"));

      setIsMatching(false);
      // 채팅방이 아닌 실시간 관리 대시보드(상태 페이지)로 이동
      router.push(`/myMeeting`); 
    }, 2000);
  };

  // [3. 매칭 수락 로직 - 참여자용]
  const handleAccept = () => {
    const selectedRoom = mockMatchingRooms[0];
    const saved = localStorage.getItem("joinedMeetings");
    const meetings = saved ? JSON.parse(saved) : [];
    
    if (!meetings.some((m: any) => m.id === selectedRoom.id)) {
      meetings.push({
        ...selectedRoom,
        category: "모빌리티",
        role: "MEMBER", // 참여자 권한
        joinedAt: new Date().toISOString()
      });
      localStorage.setItem("joinedMeetings", JSON.stringify(meetings));
      window.dispatchEvent(new Event("joinedMeetingsUpdate"));
    }
    
    router.push("/myMeeting"); 
  };

  const mobilitySpots = [
    { id: 1, name: "정자역 3번 출구", description: "카풀 최다 매칭 지역" },
    { id: 2, name: "판교 테크노밸리 PD", description: "퇴근 시간대 상습 정체" },
    { id: 3, name: "수내역 롯데백화점", description: "단거리 택시 합승 활발" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden relative">
      
      {/* 1. 상단 탭 스위처 */}
      <div className="flex bg-white px-6 pt-4 gap-6 z-20 border-b border-gray-50">
        <button 
          onClick={() => setSelectedTab("matching")}
          className={`pb-3 px-2 text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
            selectedTab === "matching" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-300"
          }`}
        >
          <Search size={16} /> 실시간 매칭
        </button>

        {isCarVerified && (
          <button 
            onClick={() => setSelectedTab("register")}
            className={`pb-3 px-2 text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
              selectedTab === "register" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-300"
            }`}
          >
            <Plus size={16} /> 카풀 경로 등록
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* 2. 좌측 입력 패널 */}
        <div className="w-full md:w-80 bg-white border-r border-gray-100 p-6 z-10 shadow-2xl overflow-y-auto no-scrollbar">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2 tracking-tighter">
                {selectedTab === "matching" ? "자동 방향 매칭" : "신규 노선 생성"}
              </h2>
              
              <div className="space-y-3">
                <div className="relative group">
                  <MapPin className="absolute left-3 top-3.5 text-blue-500" size={18} />
                  <input 
                    placeholder="출발지 입력" 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-3.5 text-red-500" size={18} />
                  <input 
                    placeholder="목적지 입력" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              <button 
                onClick={selectedTab === "matching" ? handleStartMatching : handleRegisterRoute}
                disabled={!isFormValid || isMatching}
                className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  !isFormValid 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                  : selectedTab === "matching" 
                    ? "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700"
                    : "bg-gray-900 text-white shadow-gray-200"
                }`}
              >
                {isMatching ? (
                  <><Loader2 className="animate-spin" size={18} /> {selectedTab === "matching" ? "경로 분석 중..." : "노선 등록 중..."}</>
                ) : (
                  <>{selectedTab === "matching" ? "매칭 시작하기" : "카풀 경로 등록"} <ArrowRight size={16}/></>
                )}
              </button>
            </div>

            <div className="pt-2">
              <p className="text-[10px] font-black text-gray-300 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Info size={12}/> Recommended Stops
              </p>
              <div className="space-y-3">
                {mobilitySpots.map(spot => (
                  <button 
                    key={spot.id} 
                    onClick={() => setOrigin(spot.name)}
                    className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                  >
                    <p className="text-xs font-black text-gray-700 group-hover:text-blue-600">{spot.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-tighter">{spot.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 우측 지도 영역 (생략 가능, 기존 유지) */}
        <div className="flex-1 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-multiply" />
          
          {isMatching && (
            <div className="absolute inset-0 z-30 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-500">
               <div className="relative mb-6">
                  <div className="absolute -inset-10 bg-blue-500/20 rounded-full animate-ping" />
                  <div className="relative bg-blue-600 p-6 rounded-full text-white shadow-2xl">
                    <Search size={40} className="animate-pulse" />
                  </div>
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2">
                 {selectedTab === "matching" ? "방향 유사도를 분석하고 있어요!" : "신규 경로를 시스템에 등록 중입니다"}
               </h3>
               <p className="text-sm font-bold text-gray-400 italic">3정류장 이내의 카풀/택시 팟을 찾고 있습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* --- 매칭 결과 팝업 모달 (참여자 전용) --- */}
      {showResult && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowResult(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[3rem] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight">
                  나와 경로가 유사한<br/>이웃들을 찾았어요!
                </h3>
              </div>
              <button onClick={() => setShowResult(false)} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20}/></button>
            </div>

            <div className="space-y-4 mb-10">
              {suggestedCandidates.matching.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 font-black italic">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-gray-900">{user.name}</span>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[8px] font-black uppercase">
                          <Star size={8} fill="white"/> {user.score}
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 italic tracking-tight">{user.desc}</p>
                    </div>
                  </div>
                  <div className="text-right font-black text-blue-600 text-xs italic">{user.matchRate}%</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => router.push("/")} className="py-4 bg-gray-100 text-gray-400 rounded-[1.8rem] text-sm font-black active:scale-95 transition-all">거절하기</button>
              <button onClick={handleAccept} className="py-4 bg-gray-900 text-white rounded-[1.8rem] text-sm font-black active:scale-95 transition-all shadow-xl shadow-gray-200">매칭 수락하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}