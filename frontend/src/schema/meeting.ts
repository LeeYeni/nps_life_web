export interface GroupBuyMeeting {
  id: number;
  adminId: number;
  title: string;        // 모임 제목 (예: "대패삼겹살 소분하실 분!")
  currentParticipants: number;
  maxParticipants: number;
  deadline: string;     // 마감 임박 표시용
  status: 'OPEN' | 'CLOSED' | 'FULL';
}