"use client";

import { useState, useEffect } from "react";
import { ProductItem } from "@/schema/groupBuy";
import { Snowflake, Thermometer, Sun, ShoppingCart, Tag, Trash2 } from "lucide-react";

interface ProductCardProps {
  item: ProductItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const [isInCart, setIsInCart] = useState(false);

  // 1. 장바구니 상태 확인 함수
  const checkCartStatus = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart: ProductItem[] = JSON.parse(savedCart);
      setIsInCart(cart.some((cartItem) => cartItem.name === item.name));
    } else {
      setIsInCart(false);
    }
  };

  useEffect(() => {
    checkCartStatus();
    window.addEventListener("cartUpdate", checkCartStatus);
    return () => window.removeEventListener("cartUpdate", checkCartStatus);
  }, [item.name]);

  // 2. 토글 핸들러 (담기 또는 삭제)
  const toggleCart = () => {
    const savedCart = localStorage.getItem("cart");
    let cart: ProductItem[] = savedCart ? JSON.parse(savedCart) : [];

    if (isInCart) {
      // 이미 있다면 삭제 (취소)
      cart = cart.filter((cartItem) => cartItem.name !== item.name);
    } else {
      // 없다면 추가
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdate")); // 전체 UI 동기화
  };

  const storageConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    "냉동 식재료": { icon: <Snowflake size={14} />, color: "bg-blue-600", label: "냉동" },
    "냉장 식재료": { icon: <Thermometer size={14} />, color: "bg-cyan-500", label: "냉장" },
    "실온 식재료": { icon: <Sun size={14} />, color: "bg-orange-500", label: "실온" },
  };

  const config = storageConfig[item.storage] || { 
    icon: <Tag size={14} />, 
    color: "bg-gray-400", 
    label: item.storage 
  };

  return (
    <div className={`group bg-white rounded-3xl border p-5 transition-all duration-300 ${
      isInCart ? "border-blue-500 bg-blue-50/20 shadow-inner" : "border-gray-100 shadow-sm hover:shadow-md"
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white ${config.color}`}>
          {config.icon}
          {config.label}
        </div>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
          {item.category}
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">
          {item.foodGroup}
        </div>
        <h3 className={`text-lg font-black transition-colors leading-tight ${
          isInCart ? "text-blue-700" : "text-gray-900 group-hover:text-blue-600"
        }`}>
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 font-medium italic">
          {item.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100/50 flex justify-end items-center">
        {/* 토글 버튼: 상태에 따라 색상과 아이콘 변경 */}
        <button 
          onClick={toggleCart}
          className={`h-11 px-4 rounded-2xl flex items-center gap-2 font-black text-xs transition-all active:scale-95 shadow-lg ${
            isInCart 
            ? "bg-red-50 text-red-600 hover:bg-red-100 shadow-red-100" 
            : "bg-gray-900 text-white hover:bg-blue-600 shadow-gray-100"
          }`}
        >
          {isInCart ? (
            <>
              <Trash2 size={16} />
              담기 취소
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              장바구니 담기
            </>
          )}
        </button>
      </div>
    </div>
  );
}