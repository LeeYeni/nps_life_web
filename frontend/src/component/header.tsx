"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  User, 
  LogOut, 
  ShoppingCart, // 장바구니용
  Users,        // 모임용
  ChevronDown
} from "lucide-react";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [persona, setPersona] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const updateStateFromStorage = () => {
    const loginItem = localStorage.getItem("isLogin") === "true";
    const personaItem = localStorage.getItem("persona");
    setIsLogin(loginItem);
    setPersona(personaItem);
  };

  useEffect(() => {
    updateStateFromStorage();
    window.addEventListener("storage", updateStateFromStorage);
    
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(new Event("storage"));
    };

    return () => {
      window.removeEventListener("storage", updateStateFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("persona");
    window.dispatchEvent(new Event("storage"));
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
          <span className="text-lg font-black tracking-tighter text-gray-900">
            1인 가구 맞춤 1/N 정산 시뮬레이션
          </span>
        </Link>

        {/* 네비게이션 및 유저 메뉴 */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pl-3 transition-all hover:border-blue-300 hover:shadow-md active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <User size={18} />
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
              </button>

              {/* 드롭다운 메뉴 */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5">
                  <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    My Menu
                  </div>
                  
                  {/* 장바구니 아이콘 변경: ShoppingCart */}
                  <Link
                    href="/cart"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <ShoppingCart size={18} strokeWidth={2.5} /> 장바구니
                  </Link>

                  {/* 모임 아이콘 변경: Users */}
                  <Link
                    href="/meetings"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Users size={18} strokeWidth={2.5} /> 내 모임
                  </Link>

                  <div className="my-1 border-t border-gray-50" />

                  <Link
                    href="/"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={18} strokeWidth={2.5} /> 로그아웃
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </header>
  );
}