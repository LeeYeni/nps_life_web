import { MobilitySpot } from "@/schema/hub";

/**
 * 버스 정류장과 공구 사물함 거점을 분리한 목업 데이터
 */
export const mobilitySpots: MobilitySpot[] = [
  // --- 🚌 버스 정류장 (모빌리티 전용) ---
  {
    id: 1,
    name: "낙생육교 (판교역 방면)",
    type: "BUS_STOP",
    lat: 37.3915,
    lng: 127.1118,
    description: "판교 테크노밸리와 주거지를 잇는 광역 버스 환승 거점"
  },
  {
    id: 2,
    name: "H스퀘어·삼환하이펙스",
    type: "BUS_STOP",
    lat: 37.4021,
    lng: 127.1104,
    description: "IT 기업 밀집 지역 내 퇴근 카풀 및 택시 합승 주요 포인트"
  },
  {
    id: 3,
    name: "풍덕천2동 행정복지센터",
    type: "BUS_STOP",
    lat: 37.3245,
    lng: 127.0874,
    description: "수지구 내 주거 밀집 지역으로 진입하는 마을버스 거점"
  },
  {
    id: 4,
    name: "신봉사거리",
    type: "BUS_STOP",
    lat: 37.3292,
    lng: 127.0754,
    description: "택시 합승 수요가 많은 아파트 단지 입구 정류장"
  },

  // --- 📦 사물함 거점 (공동구매 전용) ---
  {
    id: 101,
    name: "판교 제2테크노밸리 사물함",
    type: "LOCKER_STATION",
    lat: 37.4085,
    lng: 127.1042,
    description: "직장인 퇴근길 소분 물품 수령을 위한 무인 사물함"
  },
  {
    id: 102,
    name: "수지 동천동 쉐어링 박스",
    type: "LOCKER_STATION",
    lat: 37.3385,
    lng: 127.1012,
    description: "인근 거주자들 간의 생활용품 나눔 거점"
  },
  {
    id: 103,
    name: "상현동 주민공유 사물함",
    type: "LOCKER_STATION",
    lat: 37.3021,
    lng: 127.0945,
    description: "지역 커뮤니티 활성화를 위한 비대면 물품 보관소"
  }
];