"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonaCard from "@/component/persona"; // 대문자 체크 필요
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import { persona4 } from "@/mockup_data/persona4"; // 페르소나 4 추가

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
    
    // Header 및 Home 화면 동기화를 위한 이벤트 트리거
    window.dispatchEvent(new Event("storage")); 
    
    setSelectedPersona(personaKey);
    
    // 1/N 정산 시뮬레이션 메인 홈으로 이동
    router.push("/");
  };

  const personas = [
    { key: "persona1", data: persona1.user },
    { key: "persona2", data: persona2.user },
    { key: "persona3", data: persona3.user },
    { key: "persona4", data: persona4.user },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-7xl w-full text-center">
        {/* 헤더 섹션: 플랫폼 목적 명시 */}
        <h1 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl tracking-tighter">
          시뮬레이션을 위한 페르소나를 선택해주세요
        </h1>
        <p className="mb-12 text-gray-500 text-lg font-medium">
          유형에 따라 인증 지표와 정산 로직이 다르게 적용됩니다.
        </p>

        {/* 페르소나 그리드: 2x2 혹은 3열 레이아웃 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <div 
              key={p.key}
              onClick={() => handleSelectPersona(p.key)}
              className="cursor-pointer transition-transform hover:-translate-y-2"
            >
              <PersonaCard
                user={p.data}
                // isSelected 등 추가 prop이 PersonaCard에 정의되어 있다면 유지
              />
              <div className={`mt-4 h-1 w-full rounded-full transition-colors ${selectedPersona === p.key ? 'bg-blue-600' : 'bg-transparent'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}