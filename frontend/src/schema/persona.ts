/**
 * 서비스 통합 페르소나 스키마
 */

export interface User {
  id: number;
  name: string;
  description: string;
  
  // 신뢰 검증 상태 (API 기반)
  verification: {
    efine: boolean;           // 이파인 API: 면허 및 사고 이력 인증 여부
    car365: boolean;          // 자동차365 API: 본인 명의 차량 인증 여부
    identity: boolean;        // 기본 본인 인증 여부
  };

  // 핵심 신뢰도 지표 (통계)
  reliability: {
    carpoolSuccessRate: number; // 카풀 이행률 (%)
    settlementRate: number;     // 정산 완료율 (%)
    cleanTradeRate: number;     // 클린 거래율 (%)
    totalTradeCount: number;    // 전체 거래/매칭 횟수
  };
}

// 2. 모빌리티(카풀/택시) 매칭 이력
export type MobilityStatus = 'MATCHED' | 'ONBOARDING' | 'ARRIVED' | 'COMPLETED' | 'CANCELLED';

export interface MobilityRecord {
  id: number;
  userId: number;             // 해당 페르소나 ID
  partnerId: number;          // 매칭 상대방 ID
  type: 'CARPOOL' | 'TAXI';   // 카풀인지 택시 합승인지
  status: MobilityStatus;
  
  // 부정 수급 방지 로직 데이터
  bleVerified: boolean;       // P2P BLE 신호 감지 여부
  origin: string;             // 출발지
  destination: string;        // 목적지
  
  fare: number;               // 분담 비용
  requestDate: string;        // 매칭/이용 날짜
}

// 3. 공동구매(공구) 거래 이력
export type GroupBuyStatus = 'JOINED' | 'STOCKED' | 'PICKUP_READY' | 'COMPLETED' | 'REFUNDED';

export interface GroupBuyRecord {
  id: number;
  userId: number;
  hostId: number;
  item: string;               // 구매 물품명
  status: GroupBuyStatus;
  
  // 비대면 배분 로직 데이터
  lockerId?: string;          // 할당된 사물함 번호
  lockerPasscode?: string;    // 사물함 비밀번호 (PICKUP_READY 시 활성화)
  
  isSettled: boolean;         // [수령 완료] 클릭 및 대금 지급 여부
  amount: number;             // 결제 금액
  orderDate: string;
  pickupDate?: string;        // 실제 수령 시각
}

// 통합 페르소나 객체 타입
export interface Persona {
  user: User;
  mobilityRecords: MobilityRecord[];
  groupBuyRecords: GroupBuyRecord[];
}