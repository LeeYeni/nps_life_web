import { ChatRoom } from "@/schema/chat";

export const mockChatRooms: ChatRoom[] = [
  {
    meetingId: 1,
    title: "대패삼겹살 2kg 소분 (정자역 거점)",
    participants: 3,
    messages: [
      {
        id: "msg-1",
        senderId: 0,
        senderName: "시스템",
        content: "공동구매 참여가 확정되었습니다! 이웃과 인사를 나눠보세요.",
        timestamp: "오후 2:00",
        isSystem: true
      },
      {
        id: "msg-2",
        senderId: 1, // 방장
        senderName: "김ㅇㅇ(방장)",
        content: "안녕하세요! 제가 오늘 퇴근길에 정자역 사물함에 넣어둘게요. 다들 괜찮으신가요?",
        timestamp: "오후 2:05"
      },
      {
        id: "msg-3",
        senderId: 999, // 나
        senderName: "나ㅇㅇ",
        content: "네! 저는 7시 이후면 언제든 수령 가능합니다.",
        timestamp: "오후 2:10"
      },
      {
        id: "msg-4",
        senderId: 1,
        senderName: "김ㅇㅇ(방장)",
        content: "방금 정자역 3번출구 사물함에 보관 완료했습니다! 아래 정보 확인해 주세요. 🥩",
        timestamp: "오후 6:30"
      },
      {
        id: "msg-5",
        senderId: 0,
        senderName: "시스템",
        content: "🔐 [보관 정보] 위치: 정자역 3번출구 A-12번 사물함 / 비밀번호: 0313*",
        timestamp: "오후 6:31",
        isSystem: true // 시스템 메시지로 처리하여 눈에 띄게 구성
      },
      {
        id: "msg-6",
        senderId: 999,
        senderName: "나ㅇㅇ",
        content: "오 확인했습니다! 지금 바로 가고 있어요. 고생하셨습니다!",
        timestamp: "오후 6:35"
      },
      {
        id: "msg-7",
        senderId: 3,
        senderName: "박ㅇㅇ",
        content: "저도 방금 확인했어요! 소분 깔끔하게 해주셔서 감사합니다~",
        timestamp: "오후 6:40"
      }
    ]
  }
];