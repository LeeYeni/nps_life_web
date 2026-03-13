import { Persona } from "@/schema/persona";

/**
 * Persona 4: 시간 제약 없이 비대면 수령을 선호하는 "최지우"
 * - 역할: 공구 멤버(MEMBER) 및 택시 수요자(RIDER)
 * - 특징: 이미지 기반 요구사항(자유로운 수령, 소량 저렴 구매, 수령 후 정산) 반영
 */

export const persona4: Persona = {
  user: {
    id: 4,
    name: "최ㅇㅇ",
    description: "24시간 언제든 비대면 수령 | 직거래 시간 제약 없는 자유로운 구매",
    
    // 신뢰 검증 상태: 서비스 이용을 위한 기본 본인 인증 완료
    verification: {
      efine: false,
      car365: false,
      identity: true,   // 24시간 비대면 수령 및 정산을 위한 인증 완료
    },

    // 핵심 신뢰도 지표 (이미지 기반)
    reliability: {
      carpoolSuccessRate: 0,    // 주로 수요자로 활동
      settlementRate: 98.8,     // 정산 완료율: 물품 수령 후 정산까지 완료된 비율
      cleanTradeRate: 100,      
    },
  },
};