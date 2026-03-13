"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlusCircle, ShoppingBasket } from "lucide-react";
import { mockProductItems } from "@/mockup_data/group";
import ProductCard from "@/component/productCard";
import { ProductItem } from "@/schema/group";

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

  // 초기 렌더링 시 데이터 로드
  useEffect(() => {
    loadCart();

    // 다른 탭이나 컴포넌트에서 변경 시 동기화를 위한 이벤트 리스너 (선택 사항)
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdate", handleCartUpdate);
    return () => window.removeEventListener("cartUpdate", handleCartUpdate);
  }, []);

  // 2. 추천 섹션에서 상품을 추가하는 핸들러
  const handleAddFromRecommendation = (item: ProductItem) => {
    const savedCart = localStorage.getItem("cart");
    const cart: ProductItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      alert("이미 담겨 있는 상품입니다.");
      return;
    }

    const newCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(newCart));
    loadCart(); // UI 갱신
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-20">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-black text-gray-900">내 장바구니</h1>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            총 {myCart.length}개 상품
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        
        {/* --- 섹션 1: 내가 담은 목록 (localStorage 기반) --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <ShoppingBasket className="text-blue-600" />
              내가 담은 소분 물품
            </h2>
          </div>

          {myCart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCart.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="relative group">
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

        {/* --- 섹션 2: 유사한 모임 추천 (부가) --- */}
        <section className="space-y-8 pt-6 border-t border-gray-200">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-gray-900">이런 모임은 어떠세요?</h2>
            <p className="text-sm text-gray-500 font-medium">현재 인기 있는 소분 품목들을 추천해 드려요.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 장바구니에 없는 아이템만 필터링하여 추천 */}
            {mockProductItems
              .filter(item => !myCart.some(cartItem => cartItem.name === item.name))
              .slice(0, 3)
              .map((item, idx) => (
                <div key={`rec-${idx}`} className="flex flex-col">
                  <div className="opacity-80 hover:opacity-100 transition-opacity scale-95 origin-top">
                    <ProductCard item={item} />
                  </div>
                  <button 
                    onClick={() => handleAddFromRecommendation(item)}
                    className="mt-3 w-full py-3 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <PlusCircle size={14} />
                    함께 담기
                  </button>
                </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}