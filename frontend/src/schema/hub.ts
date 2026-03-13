/**
 * 1/N 플랫폼 핵심 서비스 및 위치 정보 스키마
 */

// --- 0. 위치 정보 공통 스키마 ---
export interface MobilitySpot {
  id: number;
  name: string;
  type: 'BUS_STOP' | 'SUBWAY' | 'LOCKER_STATION'; // 거점 종류
  lat: number;
  lng: number;
  description: string;
}

// --- 1. 모빌리티 공통 타입 ---
export type MobilityType = 'CARPOOL' | 'TAXI';
export type MatchStatus = 'OPEN' | 'MATCHED' | 'DRIVING' | 'ARRIVED' | 'COMPLETED';

// [카풀 스키마] 공급자(드라이버) 중심의 경로 기반 모델
export interface Carpool {
  id: string;
  driverId: number;           // Persona ID (드라이버)
  capacity: number;           // 총 탑승 가능 인원
  currentRiders: number[];    // 참여 중인 Persona ID 리스트
  
  origin: MobilitySpot;       // 출발 정류장 (MobilitySpot 참조)
  destination: {
    name: string;             // 목적지는 주소나 건물명일 수 있으므로 유연하게 유지
    lat: number;
    lng: number;
  };
  
  departureTime: string;      
  totalFare: number;          // 예상 총 유류비/통행료
  splitFare: number;          // 1/N 인당 분담 금액
  
  status: MatchStatus;
  bleAuthCodes: string[];     // 드라이버-동승자 간 P2P BLE 인증 키
}

// [택시 스키마] 수요자 중심의 실시간 합승 모델
export interface TaxiMatch {
  id: string;
  hostId: number;             // 방장 Persona ID
  participants: number[];     // 동승자 Persona ID 리스트
  maxParticipants: number;    // 목표 인원
  
  route: {
    origin: MobilitySpot;     // 시작 정류장
    destination: string;      // 최종 목적지 명칭
    waypoints: MobilitySpot[]; // 경유하는 정류장 리스트
  };
  
  estimatedFare: number;      // 예상 택시비
  currentFarePerPerson: number; // 현재 인원 기준 1/N 금액
  
  status: MatchStatus;
  autoSettlement: boolean;    // 자동 송금 활성화 여부
}

// --- 2. 공동구매 스키마 ---
export type GroupBuyStatus = 'RECRUITING' | 'ORDERED' | 'STOCKED' | 'COMPLETED';

export interface GroupBuy {
  id: string;
  hostId: number;             // 방장(소분 공급자) Persona ID
  item: {
    name: string;             // 생활용품 명칭
    totalQuantity: number;    // 전체 수량
    unit: string;             // 소분 단위 (예: 3롤, 500ml)
  };
  
  totalPrice: number;         // 대용량 구매 원가
  splitPrice: number;         // 1인 소분 구매가
  
  participants: {
    userId: number;
    isPickedUp: boolean;      // 사물함 수령 완료 여부
    settled: boolean;         // [수령 완료] 클릭 시 대금 지급 여부
  }[];
  
  locker: {
    id: string;               // 거점 사물함 ID
    passcode: string;         // 비대면 수령 비밀번호
    location: MobilitySpot;   // 사물함 거점 위치 (정류장 데이터와 연동)
  };
  
  status: GroupBuyStatus;
}