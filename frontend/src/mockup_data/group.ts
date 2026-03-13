import { ProductItem } from "@/schema/group";

/**
 * 이미지의 모든 텍스트(설명 및 예시)를 포함한 생활용품 상세 목업 데이터
 */
export const mockProductItems: ProductItem[] = [
  {
    name: "냉동 대패 삼겹살",
    storage: "FREEZE",
    category: "LIVESTOCK",
    foodGroup: "MEAT_FISH",
    totalQuantity: 10,
    unit: "500g",
    description: "영하 18°C 이하 보관 필수. 냉동육, 냉동 수산물, 냉동 가공식품 분류. 육류(돼지·소·닭고기), 알류(계란), 우유 및 유제품 포함 축산물 원료. 어육류군(고기, 생선, 계란, 콩류) 단백질원."
  },
  {
    name: "신선 손질 고등어",
    storage: "REFRIGERATED",
    category: "MARINE",
    foodGroup: "MEAT_FISH",
    totalQuantity: 8,
    unit: "2마리",
    description: "5°C 이하 보관. 신선 육류, 어패류, 유제품, 전처리 농산물(세척·절단된 채소 등) 냉장 기준. 어류, 패류, 해조류 등 수산물 원료. 어육류군 단백질원."
  },
  {
    name: "백미 (곡류)",
    storage: "ROOM_TEMPERATURE",
    category: "AGRICULTURAL",
    foodGroup: "GRAIN",
    totalQuantity: 5,
    unit: "2kg",
    description: "1~35°C (직사광선 피함) 실온 보관. 곡류, 건조 식재료, 장류, 조미료 분류. 곡류, 채소류, 과일류, 서류(감자·고구마) 등 농산물 원료. 밥, 빵, 국수와 같은 주식 분류군."
  },
  {
    name: "손질 당근 및 브로콜리",
    storage: "REFRIGERATED",
    category: "AGRICULTURAL",
    foodGroup: "VEGETABLE",
    totalQuantity: 12,
    unit: "300g",
    description: "5°C 이하 보관. 세척·절단된 채소 등 전처리 농산물. 농산물 중 채소류 분류. 채소, 버섯류를 포함한 채소군."
  },
  {
    name: "슬라이스 가공 치즈",
    storage: "REFRIGERATED",
    category: "PROCESSED",
    foodGroup: "MILK",
    totalQuantity: 20,
    unit: "10매",
    description: "5°C 이하 보관. 원재료를 가공한 식품(농·축·수산 가공품). 우유 및 유제품 축산물 원료. 우유, 요거트, 치즈를 포함한 우유군."
  },
  {
    name: "견과류 믹스 (조미료/장류 분류)",
    storage: "ROOM_TEMPERATURE",
    category: "AGRICULTURAL",
    foodGroup: "FAT",
    totalQuantity: 15,
    unit: "200g",
    description: "1~35°C 실온 보관. 건조 식재료 및 조미료 분류. 농산물 중 곡류 및 견과류. 식용유, 견과류, 버터를 포함한 지방군."
  },
  {
    name: "세척 꿀사과 (과일류)",
    storage: "ROOM_TEMPERATURE",
    category: "AGRICULTURAL",
    foodGroup: "FRUIT",
    totalQuantity: 10,
    unit: "2알",
    description: "1~35°C 실온 보관. 농산물 중 과일류 분류. 각종 과일류를 포함한 과일군."
  },
  {
    name: "감자 및 고구마 세트 (서류)",
    storage: "ROOM_TEMPERATURE",
    category: "AGRICULTURAL",
    foodGroup: "GRAIN",
    totalQuantity: 10,
    unit: "1kg",
    description: "1~35°C 실온 보관. 농산물 중 서류(감자·고구마) 분류. 곡류군(밥, 빵, 국수) 주식 분류군 포함."
  }
];