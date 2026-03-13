import { Persona } from "@/schema/persona";

/**
 * Persona 1: 신뢰도 높은 베테랑 드라이버 "김철수"
 * - 역할: 카풀 공급자(DRIVER) 및 공구 멤버(MEMBER)
 * - 특징: 이파인/자동차365 인증 완료, 매우 높은 카풀 이행률 보유
 */

export const persona1: Persona = {
  user: {
    id: 1,
    name: "김ㅇㅇ",
    description: "이파인·자동차365 인증을 완료한 드라이버 | 안심 카풀과 투명한 정산",
    
    // 신뢰 검증 상태: 모든 공공 API 인증 완료
    verification: {
      efine: true,      // 면허 및 사고 이력 검증 완료
      car365: true,     // 본인 명의 차량 및 번호판 확인 완료
      identity: true,   // 본인 인증 완료
    },

    // 신뢰도 지표: 높은 이행률과 정산 완료율
    reliability: {
      carpoolSuccessRate: 98.5, // 98.5%의 높은 카풀 이행률
      settlementRate: 100,      // 모든 정산 지연 없이 완료
      cleanTradeRate: 100,      // 신고 이력 없음
    },
  },
};