"use client";

import { useState, useEffect } from "react";
import PersonaPage from "./persona/page";
import HubPage from "./hub/page";

export default function Home() {
  // 초기값은 false로 설정
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [category, setCategory] = useState<"carpool" | "shopping">("carpool");
  const [isLoading, setIsLoading] = useState(true); // 로컬스토리지 확인 중임을 표시

  useEffect(() => {
    // 1. 로컬스토리지에서 로그인 여부 확인
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
    
    // 2. 확인이 끝났으므로 로딩 상태 해제
    setIsLoading(false);

    // 3. 스토리지 변화 감지 (로그인/로그아웃 시 실시간 반영)
    const handleStorageChange = () => {
      const updatedStatus = localStorage.getItem("isLogin") === "true";
      setIsLogin(updatedStatus);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 로딩 중일 때는 깜빡임을 방지하기 위해 빈 화면 혹은 스켈레톤 노출
  if (isLoading) return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="flex flex-1 flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {!isLogin ? (
        <PersonaPage />
      ) : (
        /* 로그인 후 화면 */
        <HubPage />
      )}
    </div>
  );
}