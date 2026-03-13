"use client";

import { 
  Car, 
  CarFront, 
  ShoppingBag, 
  ChevronRight, 
  ShieldCheck, 
  MapPin 
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HubProps {
  userName: string;
}

export default function Hub({ userName }: HubProps) {
  const router = useRouter();

  const services = [
    {
      id: "carpool",
      title: "카풀 (출퇴근)",
      description: "이파인 인증 드라이버와 안전한 동승",
      icon: <Car className="text-blue-600" size={28} />,
      count: "12개 운행 중",
      color: "bg-blue-50",
      path: "/carpool"
    },
    {
      id: "taxi",
      title: "택시 합승",
      description: "심야 시간대 1/N 택시비 분담",
      icon: <CarFront className="text-yellow-500" size={28} />,
      count: "5개 매칭 중",
      color: "bg-yellow-50",
      path: "/taxi"
    },
    {
      id: "groupbuy",
      title: "생활용품 공구",
      description: "비대면 사물함 소분 나눔",
      icon: <ShoppingBag className="text-green-600" size={28} />,
      count: "28개 모집 중",
      color: "bg-green-50",
      path: "/groupbuy"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      {/* 유저 환영 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600">
          <ShieldCheck size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">Verified User</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 leading-tight">
          {userName}님, <br />
          어떤 1/N 정산을 시작할까요?
        </h2>
      </div>

      {/* 서비스 카드 리스트 */}
      <div className="grid gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => router.push(service.path)}
            className="group relative flex items-center justify-between p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 text-left"
          >
            <div className="flex items-center gap-5">
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${service.color} transition-transform group-hover:scale-110`}>
                {service.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-black text-gray-900">{service.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                    {service.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-snug">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>

      {/* 하단 퀵 인포: 주변 거점 */}
      <div className="rounded-3xl bg-gray-900 p-6 text-white overflow-hidden relative">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
              <MapPin size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nearby Station</p>
              <p className="text-sm font-bold">수지구청역 사물함 거점</p>
            </div>
          </div>
          <button className="text-xs font-black px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors">
            지도 확인
          </button>
        </div>
        {/* 장식용 원형 배경 */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-30" />
      </div>
    </div>
  );
}