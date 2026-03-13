"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBasket,
} from "lucide-react";

// 데이터 및 컴포넌트 임포트
import { mockMeetings } from "@/mockup_data/meeting"; 
import ProductCard from "@/component/productCard";
import MeetingCard from "@/component/meeting"; // 공구 모임 카드 컴포넌트
import { ProductItem } from "@/schema/groupBuy";

export default function CartPage() {
  const router = useRouter();
  const [myCart, setMyCart] = useState<ProductItem[]>([]);

  // 1. localStorage에서 장바구니 데이터를 불러오는 함수
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setMyCart(JSON.parse(savedCart));
    } else {
      setMyCart([]);
    }
  };

  // 초기 렌더링 및 실시간 동기화 설정
  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdate", handleCartUpdate);
    return () => window.removeEventListener("cartUpdate", handleCartUpdate);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-20">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShoppingBasket className="text-blue-600" />
            <h1 className="text-xl font-black text-gray-900">내 장바구니</h1>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            총 {myCart.length}개 상품
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        
        {/* --- 섹션 1: 내가 담은 목록 --- */}
        <section className="space-y-6">
          {myCart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCart.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="relative">
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold italic">장바구니가 비어 있습니다.</p>
              <button 
                onClick={() => router.push("/services")}
                className="mt-4 text-sm font-black text-blue-600 hover:underline"
              >
                상품 둘러보러 가기
              </button>
            </div>
          )}
        </section>

        {/* --- 섹션 2: 동네 공구 모임 추천 --- */}
        {myCart.length > 0 && (
          <section className="space-y-8 pt-10 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">
                  동네 공구 모임 <span className="text-blue-600">TOP 3</span>를 추천드려요!
                </h2>
                <p className="text-sm text-gray-500 font-medium break-keep">
                  담아두신 식재료, 혼자 결제하기 부담스럽다면? 유사한 품목의 '동네 팟'에 합류하세요.
                </p>
              </div>
            </div>

            {/* [수정 포인트] MeetingCard에 category="공구" 인자 전달 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMeetings.slice(0, 3).map((meeting) => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  category="공구" 
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}