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
  };
}

// 통합 페르소나 객체 타입
export interface Persona {
  user: User;
}