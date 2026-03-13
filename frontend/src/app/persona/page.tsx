"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonaCard from "@/component/persona"; 
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import { persona4 } from "@/mockup_data/persona4";
import { mockMeetings } from "@/mockup_data/meeting";

export default function PersonaPage() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  useEffect(() => {
    const savedPersona = localStorage.getItem("persona");
    setSelectedPersona(savedPersona);
  }, []);

  const handleSelectPersona = (personaKey: string) => {
    // 1. 기본 로그인 및 페르소나 키 저장
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("persona", personaKey);
    
    // 2. [추가] 방장 여부 저장 (채팅 방향 결정용)
    // 페르소나 3은 방장(true), 나머지는 참여자(false)로 설정
    const isLeader = personaKey === "persona3";
    localStorage.setItem("isLeader", String(isLeader));
    
    // 3. 페르소나별 초기 모임 데이터 주입
    if (personaKey === "persona3" || personaKey === "persona4") {
      const initialMeeting = {
        ...mockMeetings[0],
        category: "공구",
        role: isLeader ? "leader" : "member",
        joinedAt: new Date().toISOString(),
      };
      
      localStorage.setItem("joinedMeetings", JSON.stringify([initialMeeting]));
    } else {
      localStorage.removeItem("joinedMeetings");
      localStorage.setItem("isLeader", "false"); // 기본값
    }
    
    // UI 동기화 이벤트
    window.dispatchEvent(new Event("storage")); 
    window.dispatchEvent(new Event("joinedMeetingsUpdate")); 
    
    setSelectedPersona(personaKey);
    router.push("/");
  };

  const personas = [
    { key: "persona1", data: persona1.user },
    { key: "persona2", data: persona2.user },
    { key: "persona3", data: persona3.user },
    { key: "persona4", data: persona4.user },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 py-12 px-4 min-h-screen">
      <div className="mx-auto max-w-7xl w-full text-center">
        <h1 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl tracking-tighter italic uppercase">
          시뮬레이션을 위한 페르소나를 선택해주세요
        </h1>
        <p className="mb-12 text-gray-500 text-lg font-medium">
          유형에 따라 자동으로 '내 모임'이 생성되며, 마이페이지에서 확인하실 수 있습니다
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <div 
              key={p.key}
              onClick={() => handleSelectPersona(p.key)}
              className="cursor-pointer transition-all hover:-translate-y-2 group"
            >
              <div className={`rounded-[2.5rem] p-1 transition-all ${
                selectedPersona === p.key ? 'bg-blue-600 shadow-xl' : 'bg-transparent hover:bg-gray-200'
              }`}>
                <PersonaCard user={p.data} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}