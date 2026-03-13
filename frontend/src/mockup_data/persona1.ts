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
    description: "이파인·자동차365 인증을 완료한 드라이버",
    
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
      totalTradeCount: 154,     // 풍부한 거래 경험
    },
  },

  // 모빌리티 이력: 최근 카풀 운행 성공 사례
  mobilityRecords: [
    {
      id: 101,
      userId: 1,
      partnerId: 202, // 페르소나 2와 매칭되었다고 가정
      type: "CARPOOL",
      status: "COMPLETED",
      bleVerified: true, // 💡 실제 동승이 BLE로 인증됨
      origin: "판교역 1번 출구",
      destination: "정자동 푸르지오 시티",
      fare: 4500,
      requestDate: "2026-03-10",
    },
    {
      id: 102,
      userId: 1,
      partnerId: 305,
      type: "CARPOOL",
      status: "COMPLETED",
      bleVerified: true,
      origin: "강남역 5번 출구",
      destination: "판교 테크노밸리",
      fare: 5200,
      requestDate: "2026-03-12",
    }
  ],

  // 공동구매 이력: 비대면 사물함 수령 사례
  groupBuyRecords: [
    {
      id: 501,
      userId: 1,
      hostId: 999,
      item: "유기농 계란 30구 (반판 나눔)",
      status: "COMPLETED",
      lockerId: "PANKYO-A-04", // 💡 판교 거점 사물함 A-04 사용
      isSettled: true,         // 수령 완료 클릭으로 대금 지급됨
      amount: 4500,
      orderDate: "2026-03-11",
      pickupDate: "2026-03-11 19:30",
    },
    {
      id: 502,
      userId: 1,
      hostId: 888,
      item: "대용량 세탁세제 2.5L",
      status: "PICKUP_READY", // 💡 현재 수령 대기 중인 상태
      lockerId: "PANKYO-B-12",
      lockerPasscode: "8823*",    // 수령을 위한 비밀번호 노출
      isSettled: false,
      amount: 12000,
      orderDate: "2026-03-13",
    }
  ],
};