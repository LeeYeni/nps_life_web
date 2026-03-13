"use client";

import { useState, useEffect } from "react";
import { Car, ShoppingBag } from "lucide-react";
import ProductPage from "../groupBuy/page";
import MatchingPage from "../matching/page";

type ServiceType = "mobility" | "groupbuy";

export default function ServicePage() {
  const [selectedTab, setSelectedTab] = useState<ServiceType>("mobility");

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[calc(100vh-64px)] overflow-hidden">
      {/* 상단 탭 내비게이션: 카풀/택시를 '이동(Mobility)'으로 통합 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-8 z-30">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedTab("mobility")}
            className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedTab === "mobility"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Car size={16} /> 카풀/택시 매칭
          </button>
          <button
            onClick={() => setSelectedTab("groupbuy")}
            className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedTab === "groupbuy"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <ShoppingBag size={16} /> 공동구매
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {selectedTab === "groupbuy" ? (
          <ProductPage />
        ) : (
          <MatchingPage />
        )}
      </div>
    </div>
  );
}