"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  MessageCircle, Inbox, LayoutGrid, Tag, Car, 
  ChevronRight, Clock, Bluetooth, CheckCircle2, 
  CreditCard, Navigation, MapPin
} from "lucide-react";

export default function MyMeetingPage() {
  const router = useRouter();
  const [joinedMeetings, setJoinedMeetings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("전체");
  
  // 모빌리티 모임들의 개별 진행 단계 관리 (ID별로 step 저장)
  // step: 0(대기/인증), 1(운행중), 2(정산중), 3(완료)
  const [mobilitySteps, setMobilitySteps] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("joinedMeetings");
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData)) {
          setJoinedMeetings(parsedData);
          // 초기 step 설정
          const steps: Record<string, number> = {};
          parsedData.forEach(m => {
            if (m.category === "모빌리티") steps[m.id] = 0;
          });
          setMobilitySteps(steps);
        }
      } catch (e) {
        console.error("데이터 파싱 오류:", e);
      }
    }
  }, []);

  const handleStepNext = (id: string) => {
    setMobilitySteps(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 3)
    }));
  };

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
              <div className="p-2 bg-blue-50 rounded-xl">
                <LayoutGrid className="text-blue-600" size={20} />
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter">내 활동 내역</h1>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {["전체", "모빌리티", "공구"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all uppercase tracking-tighter ${
                  activeTab === cat 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                  : "bg-white text-gray-400 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-6">
          {filteredMeetings.map((meeting) => {
            const isMobility = meeting.category === "모빌리티";
            const currentStep = mobilitySteps[meeting.id] || 0;
            const isLeader = meeting.role === "LEADER";

            return (
              <div key={meeting.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                        isMobility ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
                      }`}>
                        {meeting.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">{meeting.title}</h3>
                    {isMobility && (
                      <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold">
                        <MapPin size={12} className="text-blue-500"/> {meeting.origin} 
                        <ChevronRight size={10}/> 
                        <MapPin size={12} className="text-red-500"/> {meeting.destination}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  {isMobility ? (
                    <div className="space-y-3">
                      {/* Step 0: 탑승 대기 */}
                      {currentStep === 0 && (
                        <button 
                          onClick={() => handleStepNext(meeting.id)}
                          className="w-full flex items-center justify-center gap-2 py-5 bg-blue-600 text-white rounded-[1.8rem] text-sm font-black shadow-lg shadow-blue-100 animate-in zoom-in-95"
                        >
                          <Bluetooth className="animate-pulse" size={18} />
                          {isLeader ? "인원 확인 및 운행 시작" : "탑승 완료 확인 (BLE)"}
                        </button>
                      )}

                      {/* Step 1: 운행 중 */}
                      {currentStep === 1 && (
                        <button 
                          onClick={() => handleStepNext(meeting.id)}
                          className="w-full flex items-center justify-center gap-2 py-5 bg-gray-900 text-white rounded-[1.8rem] text-sm font-black animate-pulse"
                        >
                          <Navigation size={18} />
                          {isLeader ? "목적지 도착 (정산 시작)" : "운행 중... (도착 대기)"}
                        </button>
                      )}

                      {/* Step 2: 정산 진행 */}
                      {currentStep === 2 && (
                        <button 
                          onClick={() => handleStepNext(meeting.id)}
                          className="w-full flex items-center justify-center gap-2 py-5 bg-green-600 text-white rounded-[1.8rem] text-sm font-black shadow-lg shadow-green-100"
                        >
                          <CreditCard size={18} />
                          {isLeader ? "정산 현황 확인" : "1/N 즉시 정산하기"}
                        </button>
                      )}

                      {/* Step 3: 완료 */}
                      {currentStep === 3 && (
                        <div className="w-full flex items-center justify-center gap-2 py-5 bg-gray-100 text-gray-400 rounded-[1.8rem] text-sm font-black border border-dashed border-gray-200">
                          <CheckCircle2 size={18} className="text-green-500" />
                          이용 및 정산 완료
                        </div>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={() => router.push('/chat')}
                      className="w-full flex items-center justify-center gap-2 py-5 bg-gray-900 text-white rounded-[1.8rem] text-sm font-black"
                    >
                      <MessageCircle size={18} /> 
                      실시간 톡방 입장하기
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}