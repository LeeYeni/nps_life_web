"use client";

import { useState, useEffect } from "react";
import { 
  Car, 
  CarFront, 
  ShoppingBag,
  MapPin, 
  Navigation
} from "lucide-react";

// 데이터 및 컴포넌트 임포트
import { mobilitySpots } from "@/mockup_data/mobility";
import ProductPage from "../groupBuy/page";

type ServiceType = "carpool" | "taxi" | "groupbuy";

export default function ServicePage() {
  const [selectedTab, setSelectedTab] = useState<ServiceType>("carpool");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // 장바구니 수량 실시간 업데이트 로직
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.length);
      }
    };

    updateCartCount(); // 초기 로드 시 실행
    window.addEventListener("cartUpdate", updateCartCount);
    return () => window.removeEventListener("cartUpdate", updateCartCount);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[calc(100vh-64px)] overflow-hidden">
      {/* 1. 상단 공통 탭 내비게이션 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-8 z-30">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(["carpool", "taxi", "groupbuy"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab === "carpool" && <Car size={16} />}
              {tab === "taxi" && <CarFront size={16} />}
              {tab === "groupbuy" && <ShoppingBag size={16} />}
              {tab === "carpool" ? "카풀" : tab === "taxi" ? "택시 합승" : "공동구매"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 메인 콘텐츠 영역 */}
      <div className="flex-1 relative overflow-hidden">
        {selectedTab === "groupbuy" ? (
          <ProductPage />
        ) : (
          /* --- [카풀/택시 모드]: 지도 및 입력창 --- */
          <div className="h-full flex flex-col md:flex-row relative">
            {/* 좌측 입력 패널 */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 z-10 shadow-xl overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Navigation size={20} className="text-blue-600" />
                    {selectedTab === "carpool" ? "카풀 경로 설정" : "택시 합승 설정"}
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-blue-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="출발 정류장 입력" 
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-red-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="도착 목적지 입력" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
                    {selectedTab === "carpool" ? "동승자 찾기" : "택시 팟 만들기"}
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Recommended Stops</p>
                  <div className="space-y-2">
                    {mobilitySpots.filter(s => s.type === "BUS_STOP").map(spot => (
                      <button 
                        key={spot.id} 
                        onClick={() => setOrigin(spot.name)}
                        className="w-full text-left p-3 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors group"
                      >
                        <p className="text-xs font-bold text-gray-700 group-hover:text-blue-600">{spot.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{spot.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 지도 영역 (공간 확보) */}
            <div className="flex-1 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-sm">
                Map Loading... (Google Maps SDK / H3 라이브러리 연동 가능 영역)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}