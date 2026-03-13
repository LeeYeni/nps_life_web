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
      totalTradeCount: 42,      
    },
  },

  // 모빌리티 이력: 심야 시간대 택시비 분담 및 자동 송금 시나리오
  mobilityRecords: [
    {
      id: 201,
      userId: 2,
      partnerId: 501, 
      type: "TAXI",
      status: "COMPLETED",
      bleVerified: true,  // P2P BLE 매칭으로 실제 탑승 증명 (정산 먹튀 불안 해소)
      origin: "강남역 10번 출구",
      destination: "용인 수지구청역",
      fare: 12500,        // 택시비 분담액
      requestDate: "2026-03-08",
    },
    {
      id: 202,
      userId: 2,
      partnerId: 1,       // 페르소나 1과 카풀 매칭
      type: "CARPOOL",
      status: "COMPLETED",
      bleVerified: true,
      origin: "판교역 1번 출구",
      destination: "정자동 푸르지오 시티",
      fare: 4500,
      requestDate: "2026-03-10",
    }
  ],

  // 공동구매 이력: 비대면 기반의 효율적 소분 배분 (방장 활동)
  groupBuyRecords: [
    {
      id: 601,
      userId: 2,
      hostId: 2,
      item: "딸기 2kg 박스 소분 (500g)",
      status: "COMPLETED",
      lockerId: "SUJI-C-01",
      isSettled: true,    // 물품 수령 후 [수령 완료] 클릭으로 대금 지급 완료
      amount: 8000,
      orderDate: "2026-03-05",
      pickupDate: "2026-03-05 20:15",
    },
    {
      id: 602,
      userId: 2,
      hostId: 2,
      item: "프리미엄 세척 사과 5알",
      status: "STOCKED",  // 사물함 활용 비대면 배분 중
      lockerId: "SUJI-C-02",
      isSettled: false,
      amount: 6500,
      orderDate: "2026-03-12",
    }
  ],
};