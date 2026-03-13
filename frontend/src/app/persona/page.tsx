"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonaCard from "@/component/persona"; 
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import { persona4 } from "@/mockup_data/persona4";
import { mockMeetings } from "@/mockup_data/meeting";
import { mockMatchingRooms } from "@/mockup_data/matching"; // 모빌리티 목업 추가

export default function PersonaPage() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  useEffect(() => {
    const savedPersona = localStorage.getItem("persona");
    setSelectedPersona(savedPersona);
  }, []);

  const handleSelectPersona = (personaKey: string) => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("persona", personaKey);
    
    let initialMeetings = [];

    // --- [시뮬레이션 로직 분기] ---

    if (personaKey === "persona1") {
      // 1. 페르소나 1: 카풀 방장 시나리오 주입
      localStorage.setItem("isLeader", "true");
      initialMeetings.push({
        ...mockMatchingRooms[0], // 카풀 목업 데이터
        category: "모빌리티",
        role: "LEADER",
        joinedAt: new Date().toISOString(),
      });
    } 
    else if (personaKey === "persona2") {
      // 2. 페르소나 2: 택시 수요자(참여자) 시나리오 주입
      localStorage.setItem("isLeader", "false");
      initialMeetings.push({
        ...mockMatchingRooms[1], // 택시 목업 데이터
        category: "모빌리티",
        role: "MEMBER",
        joinedAt: new Date().toISOString(),
      });
    }
    else if (personaKey === "persona3" || personaKey === "persona4") {
      // 3. 기존 공구 시나리오 (페르소나 3, 4)
      const isLeader = personaKey === "persona3";
      localStorage.setItem("isLeader", String(isLeader));
      initialMeetings.push({
        ...mockMeetings[0],
        category: "공구",
        role: isLeader ? "leader" : "member",
        joinedAt: new Date().toISOString(),
      });
    } 
    else {
      localStorage.setItem("isLeader", "false");
    }

    // 데이터 저장 및 이벤트 발생
    localStorage.setItem("joinedMeetings", JSON.stringify(initialMeetings));
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
        <h1 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl tracking-tighter">
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