"use client";

import { User } from "@/schema/persona";
import {
  Car, 
  Coins, 
  CheckCircle2,
  UserCheck 
} from "lucide-react";

interface PersonaCardProps {
  user: User;
}

export default function PersonaCard({ user }: PersonaCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* 상단: 이름 및 역할 배지 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            {user.name}
          </h3>
        </div>
        
        {/* 신뢰 점수 (평균치 시뮬레이션) */}
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Reliability</p>
          <p className="text-2xl font-black text-blue-600">
            {((user.reliability.carpoolSuccessRate + user.reliability.settlementRate) / 2).toFixed(1)}
          </p>
        </div>
      </div>

      {/* 설명 (Description) */}
      <div className="mb-6 rounded-2xl bg-gray-50 p-4 border border-gray-100">
        <p className="text-sm font-medium leading-relaxed text-gray-700">
          {user.description}
        </p>
      </div>

      {/* 핵심 지표 그리드 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl border border-gray-100 p-3">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Car size={14} />
            <span className="text-[10px] font-bold uppercase">이행률</span>
          </div>
          <p className="text-sm font-black text-gray-900">{user.reliability.carpoolSuccessRate}%</p>
        </div>
        <div className="rounded-xl border border-gray-100 p-3">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Coins size={14} />
            <span className="text-[10px] font-bold uppercase">정산율</span>
          </div>
          <p className="text-sm font-black text-gray-900">{user.reliability.settlementRate}%</p>
        </div>
      </div>

      {/* 하단: 인증 상태 (이파인 / 자동차365) */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex gap-3">
          <div className={`flex items-center gap-1 text-[11px] font-bold ${user.verification.efine ? 'text-green-600' : 'text-gray-300'}`}>
            <CheckCircle2 size={12} /> 이파인
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-bold ${user.verification.car365 ? 'text-green-600' : 'text-gray-300'}`}>
            <CheckCircle2 size={12} /> 자동차365
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
          <UserCheck size={12} /> {user.reliability.totalTradeCount}회 거래
        </div>
      </div>

      {/* 포인트 사이드 바 */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600" />
    </div>
  );
}