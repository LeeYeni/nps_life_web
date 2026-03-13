import { Carpool, TaxiMatch, GroupBuy } from "@/schema/hub";
import { mobilitySpots } from "./mobility";

/**
 * 1/N 플랫폼 시나리오 기반 서비스 목업 데이터 (수정본)
 */

// 1. 카풀 목업: 고신뢰 드라이버 김철수(P1)의 출근길 경로
export const mockCarpools: Carpool[] = [
  {
    id: "CP-2026-001",
    driverId: 1, // Persona 1 (김철수)
    capacity: 4,
    currentRiders: [2, 4], 
    
    // 💡 MobilitySpot 객체 직접 참조
    origin: mobilitySpots[0], // 판교역 1번출구
    destination: {
      name: "수지구청역 2번 출구",
      lat: 37.3227,
      lng: 127.0981
    },
    
    departureTime: "2026-03-16T08:30:00",
    totalFare: 12000,   
    splitFare: 3000,    
    status: "MATCHED",
    bleAuthCodes: ["AUTH_P1_P2", "AUTH_P1_P4"] 
  }
];

// 2. 택시 합승 목업: 이영희(P2)가 주도하는 심야 합승
export const mockTaxiMatches: TaxiMatch[] = [
  {
    id: "TX-2026-099",
    hostId: 2, // Persona 2 (이영희)
    participants: [2, 4],
    maxParticipants: 3,   
    
    route: {
      // 💡 MobilitySpot 객체 직접 참조
      origin: mobilitySpots[2], // 정자역 3번출구
      destination: "수지 신봉동 아파트 단지",
      waypoints: [mobilitySpots[4]] // 동천역 정류장 경유
    },
    
    estimatedFare: 24000,
    currentFarePerPerson: 12000, 
    status: "OPEN",
    autoSettlement: true 
  }
];

// 3. 공동구매 목업: 박지민(P3)의 비대면 소분 나눔
export const mockGroupBuys: GroupBuy[] = [
  {
    id: "GB-2026-505",
    hostId: 3, // Persona 3 (박지민)
    item: {
      name: "대용량 키친타월 12롤",
      totalQuantity: 12,
      unit: "3롤"
    },
    totalPrice: 15900,
    splitPrice: 4000, 
    participants: [
      { userId: 1, isPickedUp: true, settled: true },  
      { userId: 4, isPickedUp: false, settled: false } 
    ],
    locker: {
      id: "LOCKER-SUJI-08",
      passcode: "1234*",
      // 💡 사물함 위치를 정류장 거점 데이터와 연동
      location: mobilitySpots[4] // 동천역 정류장 근처 사물함
    },
    status: "STOCKED" 
  }
];