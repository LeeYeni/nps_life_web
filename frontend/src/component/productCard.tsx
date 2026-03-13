"use client";

import { ProductItem } from "@/schema/group";
import { Snowflake, Thermometer, Sun, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  item: ProductItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  // 보관 형태에 따른 아이콘 및 색상 설정
  const storageConfig = {
    FREEZE: { icon: <Snowflake size={14} />, color: "bg-blue-600", label: "냉동 (영하 18℃ 이하)" },
    REFRIGERATED: { icon: <Thermometer size={14} />, color: "bg-cyan-500", label: "냉장 (5℃ 이하)" },
    ROOM_TEMPERATURE: { icon: <Sun size={14} />, color: "bg-orange-500", label: "실온 (1~35℃)" },
  };

  const config = storageConfig[item.storage];

  // 장바구니 담기 함수
  const addToCart = () => {
    // 1. 기존 장바구니 데이터 가져오기 (없으면 빈 배열)
    const savedCart = localStorage.getItem("cart");
    const cart: ProductItem[] = savedCart ? JSON.parse(savedCart) : [];

    // 2. 중복 체크 (이름 기준)
    const isDuplicate = cart.some((cartItem) => cartItem.name === item.name);

    if (isDuplicate) {
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }

    // 3. 데이터 추가 및 저장
    const newCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(newCart));
    
    // 4. 사용자 피드백 (간단한 알림)
    alert(`${item.name}이(가) 장바구니에 담겼습니다!`);
    
    // 커스텀 이벤트를 발생시켜 장바구니 아이콘의 숫자를 실시간으로 업데이트하게 할 수도 있습니다.
    window.dispatchEvent(new Event("cartUpdate"));
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        {/* 1. 보관 형태 뱃지 */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white ${config.color}`}>
          {config.icon}
          {config.label}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 font-medium">
          {item.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center">
        {/* 장바구니 버튼: ShoppingCart 아이콘으로 변경 및 클릭 이벤트 연결 */}
        <button 
          onClick={addToCart}
          className="h-12 w-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-100"
          title="장바구니 담기"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}