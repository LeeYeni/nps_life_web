/**
 * 매칭 및 운행 상태 관리를 위한 스키마
 */

// 1. 참여자 개별 상태 타입
export type ParticipantStatus = 'WAITING' | 'BOARDED' | 'CANCELLED';

// 2. 전체 매칭/운행 진행 상태 타입
export type MatchingProcessStatus = 
  | 'MATCHING'    // 매칭 중 (5초 애니메이션 단계)
  | 'FOUND'       // 매칭 성공 (수락/거절 대기)
  | 'WAITING_FOR_RIDE' // 탑승 대기 (방장 대기 중)
  | 'DRIVING'     // 운행 시작 (정산 발생)
  | 'SETTLEMENT'  // 정산 대기
  | 'COMPLETED';  // 완료

// 3. 동승자(참여자) 정보 스키마
export interface MatchingParticipant {
  id: number;
  name: string;
  role: 'LEADER' | 'MEMBER';
  status: ParticipantStatus;
  // 신뢰도 지표 (NPS 핵심)
  reliability: {
    score: number;          // 평균 신뢰도 점수
    successRate: number;    // 이행률 (%)
    settlementRate: number; // 정산율 (%)
  };
  avatar?: string;
}

// 4. 매칭 및 운행 상세 정보 스키마
export interface MatchingRoom {
  id: string;
  type: 'CARPOOL' | 'TAXI';
  title: string;
  origin: string;       // 출발지
  destination: string;  // 목적지
  
  // 상태 정보
  status: MatchingProcessStatus;
  
  // 참여자 목록 (방장 포함)
  participants: MatchingParticipant[];
  
  // 정산 정보
  settlement?: {
    totalFare: number;       // 총 비용 (방장이 입력)
    perPersonFare: number;   // 1/N 금액
    isRequested: boolean;    // 정산 요청 여부
  };
  
  createdAt: string;
  startTime?: string; // 실제 운행 시작 시간
}

// 5. 로컬스토리지 저장을 위한 매칭 내역 타입
export interface JoinedMatchingHistory {
  id: string;
  role: 'LEADER' | 'MEMBER';
  roomInfo: MatchingRoom;
}