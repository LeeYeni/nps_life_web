// 개별 메시지 인터페이스
export interface ChatMessage {
  id: string;
  senderId: number;      // 보낸 사람 (adminId 또는 참여자 ID)
  senderName: string;    // 발신자 이름
  content: string;       // 메시지 내용
  timestamp: string;     // 보낸 시간
  isSystem?: boolean;    // 시스템 메시지 여부 (예: "누구님이 입장했습니다")
}

// 채팅방 정보 인터페이스
export interface ChatRoom {
  meetingId: number;     // 어떤 공구 모임의 채팅방인지 (GroupBuyMeeting.id와 매칭)
  title: string;         // 채팅방 제목 (모임 제목과 연동)
  participants: number;  // 현재 참여 인원
  messages: ChatMessage[];
}