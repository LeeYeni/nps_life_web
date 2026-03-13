"use client";

import { mockProductItems } from "@/mockup_data/groupBuy";
import ProductGroup from "@/component/productGroup";
import { ShoppingBasket, ShieldCheck, Info } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen pb-20">
      {/* 1. 히어로 섹션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                식재료 소분 리스트
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 메인 콘텐츠 */}
      <div className="mx-auto max-w-7xl px-6 mt-12 space-y-12">

        {/* --- 상품 그룹 렌더링 (storageType을 한글로 수정) --- */}
        <div className="space-y-4">
          <ProductGroup 
            title="❄️ 냉동 식재료" 
            storageType="냉동 식재료" // "FREEZE"에서 수정
            items={mockProductItems} 
          />

          <ProductGroup 
            title="🧊 냉장 식재료" 
            storageType="냉장 식재료" // "REFRIGERATED"에서 수정
            items={mockProductItems} 
          />

          <ProductGroup 
            title="📦 실온 식재료" 
            storageType="실온 식재료" // "ROOM_TEMPERATURE"에서 수정
            items={mockProductItems} 
          />
        </div>
      </div>
    </div>
  );
}