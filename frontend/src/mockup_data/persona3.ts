import { Persona } from "@/schema/persona";

/**
 * Persona 3: 사물함을 활용해 비대면 나눔을 실천하는 "박지민"
 * - 역할: 공구 공급자(HOST) 및 카풀 드라이버(DRIVER)
 * - 특징: 이미지 기반 요구사항(클린 거래율, 비대면 배분, 수령 완료 기반 정산) 반영
 */

export const persona3: Persona = {
  user: {
    id: 3,
    name: "박ㅇㅇ",
    description: "비대면 기반 효율적 배분 | 사물함 활용으로 시간 약속 피로 해소",
    
    // 신뢰 검증 상태: 공급자 신뢰도를 위해 이파인 및 본인 인증 완료
    verification: {
      efine: true,      // 카풀 드라이버 활동을 위한 인증
      car365: true,     // 본인 명의 차량 인증
      identity: true,   // 공구 대금 정산을 위한 본인 인증 완료
    },

    // 핵심 신뢰도 지표 (이미지 기반)
    reliability: {
      carpoolSuccessRate: 97.2, 
      settlementRate: 100,      
      cleanTradeRate: 100,      // 클린 거래율: 허위 정보 오류 신고 없이 거래된 비율 (최상)
    },
  },
};