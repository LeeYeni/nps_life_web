"use client";

import { ProductItem } from "@/schema/group";
import { X, ShoppingBag, CreditCard, AlertCircle } from "lucide-react";

interface CartProps {
  items: ProductItem[];
  onRemove: (index: number) => void;
  onClose: () => void;
}

export default function Cart({ items, onRemove, onClose }: CartProps) {
  // 총 합계 금액 계산 (1/N 분담금 기준)
  const totalAmount = items.reduce((sum, item) => sum + (item.totalQuantity > 0 ? 5000 : 0), 0); // 예시 가격

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-blue-600" size={20} />
          <h2 className="text-xl font-black text-gray-900">소분 장바구니</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* 상품 리스트 영역 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="font-bold">장바구니가 비어있습니다.</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl relative group">
              <div className={`w-2 h-full absolute left-0 top-0 rounded-l-2xl ${
                item.storage === 'FREEZE' ? 'bg-blue-600' : 
                item.storage === 'REFRIGERATED' ? 'bg-cyan-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-gray-900 text-sm">{item.name}</h4>
                  <button onClick={() => onRemove(idx)} className="text-gray-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-1">
                  소분 단위: {item.unit} | {item.storage === 'FREEZE' ? '-18℃ 이하' : item.storage === 'REFRIGERATED' ? '5℃ 이하' : '실온'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 하단 결제 정보 */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-4">
        {/* 이미지 가이드 기반 알림 */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 font-medium leading-tight">
            거점 사물함 수령 시 제품의 보관 상태를 반드시 확인하세요. 
            신선 식재료는 수령 직후 즉시 냉장/냉동 보관이 권장됩니다.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-bold">참여 상품 {items.length}건</span>
            <span className="text-gray-900 font-black">1/N 분담 예정</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-black text-gray-900">최종 정산 금액</span>
            <span className="text-2xl font-black text-blue-600">계산 중...</span>
          </div>
        </div>

        <button 
          disabled={items.length === 0}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-gray-200 transition-colors shadow-lg shadow-gray-200"
        >
          <CreditCard size={20} />
          공동구매 참여 확정
        </button>
      </div>
    </div>
  );
}