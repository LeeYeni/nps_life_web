"use client";

import { mockProductItems } from "@/mockup_data/group";
import ProductGroup from "@/component/productGroup";
import { ShoppingBasket, ShieldCheck, Info } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen pb-20">
      {/* 1. 히어로 섹션 (이미지 분류 기준 강조) */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <ShieldCheck size={20} />
                <span className="text-sm font-black uppercase tracking-wider">Locker-Based Group Buy</span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                식재료 소분 리스트
              </h1>
              <p className="text-gray-500 font-medium max-w-xl break-keep">
                이미지 권고 지침에 따라 <span className="text-blue-600 font-bold">냉동, 냉장, 실온</span>으로 엄격히 분류된 신선 식품들입니다. 
                거점 사물함에서 비대면으로 안전하게 수령하세요.
              </p>
            </div>
            
            {/* 요약 카드 */}
            <div className="flex gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <div className="text-center px-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Items</p>
                <p className="text-xl font-black text-gray-900">{mockProductItems.length}</p>
              </div>
              <div className="w-px h-10 bg-gray-200 self-center" />
              <div className="text-center px-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Categories</p>
                <p className="text-xl font-black text-gray-900">3 Types</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 메인 콘텐츠: 카테고리별 상품 집합 */}
      <div className="mx-auto max-w-7xl px-6 mt-12 space-y-16">
        
        {/* 공지사항/가이드 (이미지 내용 요약) */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-start gap-4">
          <div className="bg-blue-600 text-white p-2 rounded-2xl">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black text-blue-900 mb-1">수령 전 보관 기준 확인</h4>
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              모든 상품은 검수 및 보관 기준을 준수합니다. 냉동은 -18°C 이하, 냉장은 5°C 이하를 유지하며, 
              실온 상품은 1~35°C 사이의 직사광선을 피한 곳에 보관됩니다.
            </p>
          </div>
        </div>

        {/* --- 상품 그룹 렌더링 --- */}
        <div className="space-y-20">
          <ProductGroup 
            title="❄️ 냉동 식재료" 
            storageType="FREEZE" 
            items={mockProductItems} 
          />

          <ProductGroup 
            title="🌡️ 냉장 식재료" 
            storageType="REFRIGERATED" 
            items={mockProductItems} 
          />

          <ProductGroup 
            title="📦 실온 식재료" 
            storageType="ROOM_TEMPERATURE" 
            items={mockProductItems} 
          />
        </div>
      </div>

      {/* 3. 플로팅 장바구니 버튼 (옵션) */}
      <div className="fixed bottom-8 right-8">
        <button className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all active:scale-95 group">
          <ShoppingBasket size={22} className="group-hover:animate-bounce" />
          <span className="font-black text-sm uppercase tracking-widest">View Cart</span>
          <div className="bg-blue-600 px-2 py-0.5 rounded-lg text-[10px]">0</div>
        </button>
      </div>
    </div>
  );
}