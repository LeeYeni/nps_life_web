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
      totalTradeCount: 215,     // 많은 나눔 경험을 가진 프로 공급자
    },
  },

  // 모빌리티 이력: 공구 물품 운반 및 카풀 드라이버 활동
  mobilityRecords: [
    {
      id: 301,
      userId: 3,
      partnerId: 402,
      type: "CARPOOL",
      status: "COMPLETED",
      bleVerified: true,
      origin: "이마트 트레이더스 구성점", // 대용량 물품 구매 후 이동 시나리오
      destination: "수지 동천동 아파트 단지",
      fare: 3500,
      requestDate: "2026-03-05",
    }
  ],

  // 공동구매 이력: 비대면 기반의 효율적 소분 배분 및 대금 지급 프로세스
  groupBuyRecords: [
    {
      id: 701,
      userId: 3,
      hostId: 3,          // 본인이 방장(Host)
      item: "대용량 키친타월 12롤 (3롤 소분)",
      status: "COMPLETED",
      lockerId: "SUJI-D-08",
      isSettled: true,    // 이미지 요구사항: 물품 수령 후 [수령 완료] 클릭으로 대금 지급됨
      amount: 5500,
      orderDate: "2026-03-01",
      pickupDate: "2026-03-02 18:45",
    },
    {
      id: 702,
      userId: 3,
      hostId: 3,
      item: "냉동 닭가슴살 5kg (1kg 나눔)",
      status: "PICKUP_READY", // 사물함 활용 비대면 배분 중 (대면 약속 피로도 해소)
      lockerId: "SUJI-D-09",
      lockerPasscode: "1234#",
      isSettled: false,   // 참여자가 [수령 완료]를 눌러야 대금이 지급되는 대기 상태
      amount: 11000,
      orderDate: "2026-03-12",
    }
  ],
};