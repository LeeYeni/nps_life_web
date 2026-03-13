"use client";

import { User } from "@/schema/persona";
import {
  Car, 
  Coins, 
  CheckCircle2,
  ShieldCheck, // 클린 거래율용 아이콘 추가
} from "lucide-react";

interface PersonaCardProps {
  user: User;
}

export default function PersonaCard({ user }: PersonaCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* 상단: 이름 및 신뢰 점수 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            {user.name}
          </h3>
        </div>
      </div>

      {/* 설명 (Description) */}
      <div className="mb-6 rounded-2xl bg-gray-50 p-4 border border-gray-100">
        <p className="text-sm font-medium leading-relaxed text-gray-700">
          {user.description}
        </p>
      </div>

      {/* 핵심 지표 그리드 (3열로 수정) */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="rounded-xl border border-gray-100 p-3 bg-white">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <Car size={13} />
            <span className="text-[9px] font-bold uppercase whitespace-nowrap">카풀 이행률</span>
          </div>
          <p className="text-sm font-black text-gray-900">{user.reliability.carpoolSuccessRate}%</p>
        </div>

        <div className="rounded-xl border border-gray-100 p-3 bg-white">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <Coins size={13} />
            <span className="text-[9px] font-bold uppercase whitespace-nowrap">정산 완료율</span>
          </div>
          <p className="text-sm font-black text-gray-900">{user.reliability.settlementRate}%</p>
        </div>

        <div className="rounded-xl border border-gray-100 p-3 bg-white">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <ShieldCheck size={13} />
            <span className="text-[9px] font-bold uppercase whitespace-nowrap">클린 거래율</span>
          </div>
          <p className="text-sm font-black text-gray-900">{user.reliability.cleanTradeRate}%</p>
        </div>
      </div>

      {/* 하단: 인증 상태 */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex gap-3">
          <div className={`flex items-center gap-1 text-[11px] font-bold ${user.verification.efine ? 'text-green-600' : 'text-gray-300'}`}>
            <CheckCircle2 size={12} /> 이파인 인증
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-bold ${user.verification.car365 ? 'text-green-600' : 'text-gray-300'}`}>
            <CheckCircle2 size={12} /> 자동차365 인증
          </div>
        </div>
      </div>
    </div>
  );
}