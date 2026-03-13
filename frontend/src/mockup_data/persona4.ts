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
      totalTradeCount: 65,      // 사물함 기반 비대면 거래 숙련자
    },
  },

  // 모빌리티 이력: 야근 후 심야 택시 합승 시나리오
  mobilityRecords: [
    {
      id: 401,
      userId: 4,
      partnerId: 2,             // 페르소나 2(이영희)와 택시 동승 시뮬레이션
      type: "TAXI",
      status: "COMPLETED",
      bleVerified: true,        // 심야 시간대 안전한 동승 인증
      origin: "강남역 2번 출구",
      destination: "수지 신봉동 아파트 단지",
      fare: 11000,
      requestDate: "2026-03-11",
    }
  ],

  // 공동구매 이력: 원하는 시간대의 자유로운 비대면 수령
  groupBuyRecords: [
    {
      id: 801,
      userId: 4,
      hostId: 3,                // 페르소나 3(박지민)이 방장인 공구 참여
      item: "냉동 닭가슴살 1kg (소분 품목)",
      status: "COMPLETED",
      lockerId: "SUJI-D-09",
      isSettled: true,          // 물품 수령 직후 정산 완료
      amount: 11000,
      orderDate: "2026-03-12",
      pickupDate: "2026-03-12 23:30", // 💡 늦은 시간 비대면 수령 성공
    },
    {
      id: 802,
      userId: 4,
      hostId: 2,
      item: "프리미엄 세척 사과 5알",
      status: "PICKUP_READY",   // 💡 직거래 시간 맞추기 불가능하여 사물함 대기 중
      lockerId: "SUJI-C-02",
      lockerPasscode: "5542*",
      isSettled: false,         // 수령 후 버튼을 눌러야 정산이 완료됨
      amount: 6500,
      orderDate: "2026-03-13",
    }
  ],
};