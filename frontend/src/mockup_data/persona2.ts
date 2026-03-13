import { Persona } from "@/schema/persona";

/**
 * Persona 2: 심야 귀가 정산 스트레스를 해소하고 싶은 "이영희"
 * - 역할: 택시 수요자(RIDER) 및 공구 공급자(HOST)
 * - 특징: 이미지 기반 요구사항(택시비 분담, 정산 스트레스 해소) 반영
 */

export const persona2: Persona = {
  user: {
    id: 2,
    name: "이ㅇㅇ",
    description: "심야 택시비 분담 | 자동 송금 유도로 정산 스트레스 해소",
    
    // 신뢰 검증 상태
    verification: {
      efine: false,     // 운전자 아님
      car365: false,
      identity: true,   // 자동 송금 및 정산을 위한 본인 인증 완료
    },

    // 핵심 신뢰도 지표 (이미지 기반)
    reliability: {
      carpoolSuccessRate: 0,
      settlementRate: 99.5,     // 정산 완료율: 매칭 성공 후 정산 오류나 거부 없이 완료된 비율
      cleanTradeRate: 100,      // 클린 거래율: 허위 정보 없이 거래된 비율
    },
  },
};