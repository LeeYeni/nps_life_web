import { GroupBuyMeeting } from "@/schema/meeting";

/**
 * 1인가구 맞춤형 공동구매 모임 목업 데이터
 * - adminId: 페르소나 데이터(예: 김철수 등)와 매칭 가능
 */
export const mockMeetings: GroupBuyMeeting[] = [
  {
    id: 1,
    adminId: 1, // 신뢰도 높은 김철수님 방장
    title: "대패삼겹살 2kg 같이 소분하실 분? (500g씩)",
    currentParticipants: 2,
    maxParticipants: 4,
    deadline: "오늘 오후 6:00 마감",
    status: "OPEN",
  },
  {
    id: 2,
    adminId: 3,
    title: "유기농 양파 5kg 한 망 너무 많네요. 3분 구해요!",
    currentParticipants: 3,
    maxParticipants: 3,
    deadline: "내일 오전 10:00 마감",
    status: "FULL", // 인원이 모두 찬 상태
  },
  {
    id: 3,
    adminId: 5,
    title: "냉동 닭가슴살 30팩 번들 - 반반 나누실 룸메 구함",
    currentParticipants: 1,
    maxParticipants: 2,
    deadline: "3시간 뒤 마감",
    status: "OPEN",
  }
];