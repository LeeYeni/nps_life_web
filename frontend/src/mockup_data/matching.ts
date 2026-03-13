import { MatchingRoom } from "@/schema/matching";
import { persona1 } from "./persona1";
import { persona2 } from "./persona2";

/**
 * 페르소나별 매칭 시나리오 목업 데이터
 * 1. 카풀: 페르소나 1(김ㅇㅇ)이 방장이며 드라이버 역할을 수행
 * 2. 택시: 페르소나 2(이ㅇㅇ)가 방장이며 합승 수요를 모집
 */

export const mockMatchingRooms: MatchingRoom[] = [
  // [Case 1] 카풀 시나리오: 페르소나 1이 방장 (운전 가능)
  {
    id: "match-carpool-p1",
    type: 'CARPOOL',
    title: "정자역 → 판교역 직장인 카풀",
    origin: "정자역 3번 출구",
    destination: "판교 테크노밸리 PD",
    status: 'FOUND',
    participants: [
      {
        id: persona1.user.id, // Persona 1 (Leader/Driver)
        name: persona1.user.name,
        role: 'LEADER',
        status: 'WAITING',
        reliability: {
          score: 99,
          successRate: persona1.user.reliability.carpoolSuccessRate,
          settlementRate: persona1.user.reliability.settlementRate,
        },
      },
      {
        id: 999, // 본인 (참여자)
        name: "사용자",
        role: 'MEMBER',
        status: 'WAITING',
        reliability: { score: 95, successRate: 98, settlementRate: 100 },
      },
      {
        id: 102,
        name: "박ㅇㅇ",
        role: 'MEMBER',
        status: 'WAITING',
        reliability: { score: 92, successRate: 94, settlementRate: 100 },
      }
    ],
    settlement: { totalFare: 0, perPersonFare: 0, isRequested: false },
    createdAt: new Date().toISOString(),
  },

  // [Case 2] 택시 시나리오: 페르소나 2가 방장 (수요자 중심)
  {
    id: "match-taxi-p2",
    type: 'TAXI',
    title: "야탑역 인근 귀가 택시 팟",
    origin: "강남역 2호선",
    destination: "야탑역",
    status: 'FOUND',
    participants: [
      {
        id: persona2.user.id, // Persona 2 (Leader/Rider)
        name: persona2.user.name,
        role: 'LEADER',
        status: 'WAITING',
        reliability: {
          score: 97,
          successRate: 100, // 합승 이행률
          settlementRate: persona2.user.reliability.settlementRate,
        },
      },
      {
        id: 999, // 본인 (참여자)
        name: "사용자",
        role: 'MEMBER',
        status: 'WAITING',
        reliability: { score: 95, successRate: 98, settlementRate: 100 },
      },
      {
        id: 108,
        name: "정ㅇㅇ",
        role: 'MEMBER',
        status: 'WAITING',
        reliability: { score: 89, successRate: 91, settlementRate: 100 },
      }
    ],
    settlement: { totalFare: 0, perPersonFare: 0, isRequested: false },
    createdAt: new Date().toISOString(),
  }
];

/**
 * 탭별로 다르게 보여줄 후보군 데이터
 */
export const suggestedCandidates = {
  matching: [
    { 
      id: persona1.user.id, 
      name: `${persona1.user.name} (드라이버)`, 
      score: 99, 
      matchRate: 98, 
      desc: "이파인/자동차365 인증 완료" 
    },
    { 
      id: persona2.user.id, 
      name: `${persona2.user.name} (합승 방장)`, 
      score: 97, 
      matchRate: 92, 
      desc: "정산 완료율 99.5% 베테랑" 
    },
  ],
  register: [
    { id: 102, name: "박ㅇㅇ (이웃)", score: 92, matchRate: 90 },
    { id: 108, name: "정ㅇㅇ (이웃)", score: 89, matchRate: 85 },
  ]
};