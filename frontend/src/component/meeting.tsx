"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GroupBuyMeeting } from "@/schema/meeting";
import { Users, Clock, ArrowRight, Tag, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

interface MeetingCardProps {
  meeting: GroupBuyMeeting;
  category: string;
}

export default function MeetingCard({ meeting, category }: MeetingCardProps) {
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);
  const isFull = meeting.status === 'FULL';
  const progress = (meeting.currentParticipants / meeting.maxParticipants) * 100;

  // 시뮬레이션을 위한 참여자 평균 신뢰도 데이터
  const avgReliability = {
    successRate: 98.5,
    settlementRate: 100,
  };

  useEffect(() => {
    const checkJoinStatus = () => {
      const saved = localStorage.getItem("joinedMeetings");
      if (saved) {
        const joinedMeetings = JSON.parse(saved);
        setIsJoined(joinedMeetings.some((m: any) => m.id === meeting.id));
      }
    };

    checkJoinStatus();
    window.addEventListener("joinedMeetingsUpdate", checkJoinStatus);
    return () => window.removeEventListener("joinedMeetingsUpdate", checkJoinStatus);
  }, [meeting.id]);

  const handleJoinChat = () => {
    if (isFull && !isJoined) return;
    const savedJoinedMeetings = localStorage.getItem("joinedMeetings");
    let joinedMeetings: any[] = savedJoinedMeetings ? JSON.parse(savedJoinedMeetings) : [];

    if (!isJoined) {
      const meetingWithCategory = { ...meeting, category };
      joinedMeetings.push(meetingWithCategory);
      localStorage.setItem("joinedMeetings", JSON.stringify(joinedMeetings));
      window.dispatchEvent(new Event("joinedMeetingsUpdate"));
    }
    router.push(`/chat`);
  };

  return (
    <div className={`group bg-white rounded-[2rem] border transition-all flex flex-col justify-between h-full p-6 shadow-sm ${
      isJoined ? "border-blue-500 ring-1 ring-blue-50" : "border-gray-100 hover:border-blue-200 hover:shadow-md"
    }`}>
      <div className="space-y-5">
        {/* 1. 상단 태그 세션 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
              isJoined ? "bg-blue-600 text-white" : meeting.status === 'OPEN' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {isJoined ? '참여 중' : meeting.status === 'OPEN' ? '모집 중' : '모집 완료'}
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 uppercase ${
              isJoined ? "text-blue-600 bg-blue-50" : "text-gray-400 bg-gray-50"
            }`}>
              <Tag size={10} />
              {category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
            <Clock size={12} /> {meeting.deadline}
          </div>
        </div>

        {/* 2. 제목 */}
        <h3 className="text-md font-black text-gray-900 leading-snug line-clamp-2">
          {meeting.title}
        </h3>

        {/* 3. 참여 인원 및 프로그레스 바 */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-gray-400 flex items-center gap-1">
              <Users size={12} /> 참여 인원
            </span>
            <span className={isJoined ? "text-blue-600" : isFull ? "text-gray-400" : "text-blue-600"}>
              {meeting.currentParticipants}/{meeting.maxParticipants}명
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${isJoined ? "bg-blue-600" : isFull ? "bg-gray-300" : "bg-blue-600"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 4. [신규] 참여자 평균 신뢰도 지표 영역 */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-blue-50 rounded-md">
              <ShieldCheck size={12} className="text-blue-600" />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">참여자 평균 신뢰도</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-gray-300">이행</span>
              <span className="text-[10px] font-black text-gray-700">{avgReliability.successRate}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-gray-300">정산</span>
              <span className="text-[10px] font-black text-blue-600">{avgReliability.settlementRate}%</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleJoinChat}
        disabled={isFull && !isJoined}
        className={`mt-6 w-full py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
          isJoined
          ? "bg-blue-600 text-white shadow-blue-100" 
          : isFull 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
          : "bg-gray-900 text-white shadow-gray-100 hover:bg-blue-600"
        }`}
      >
        {isJoined ? (
          <>
            <MessageCircle size={14} /> 톡방 입장하기
          </>
        ) : isFull ? (
          "모집 완료"
        ) : (
          <>
            모임 참여하기 <ArrowRight size={14} />
          </>
        )}
      </button>
    </div>
  );
}