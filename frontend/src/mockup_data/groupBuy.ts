import { ProductItem } from "@/schema/groupBuy";

export const mockProductItems: ProductItem[] = [
  // --- 곡류군 (농산물 / 실온) ---
  {
    name: "밥",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "곡류군",
    description: "곡류군 주식 항목. 1~35°C 실온 보관."
  },
  {
    name: "빵",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "곡류군",
    description: "곡류군 가공 항목. 실온 및 단기 보관."
  },
  {
    name: "국수",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "곡류군",
    description: "곡류군 건면 항목. 건조 식재료 실온 보관."
  },

  // --- 어육류군 (축산물·수산물 / 냉장·냉동) ---
  {
    name: "고기",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "어육류군",
    description: "신선 육류. 5°C 이하 냉장 보관 필수."
  },
  {
    name: "생선",
    storage: "냉동 식재료",
    category: "수산물",
    foodGroup: "어육류군",
    description: "어류 및 수산물. 영하 18°C 이하 냉동 보관."
  },
  {
    name: "계란",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "어육류군",
    description: "알류(계란). 신선 유지를 위한 냉장 보관."
  },
  {
    name: "콩류",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "어육류군",
    description: "식물성 단백질원. 건조 상태 실온 보관."
  },

  // --- 채소군 (농산물 / 냉장) ---
  {
    name: "채소",
    storage: "냉장 식재료",
    category: "농산물",
    foodGroup: "채소군",
    description: "신선 채소류. 세척 및 전처리 후 냉장 보관."
  },
  {
    name: "버섯류",
    storage: "냉장 식재료",
    category: "농산물",
    foodGroup: "채소군",
    description: "농산물 버섯류. 신선도 유지를 위한 냉장 보관."
  },

  // --- 지방군 (가공식품·농산물 / 실온) ---
  {
    name: "식용유",
    storage: "실온 식재료",
    category: "가공식품",
    foodGroup: "지방군",
    description: "액상 유지류. 직사광선 없는 실온 보관."
  },
  {
    name: "견과류",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "지방군",
    description: "건조 견과류. 바삭한 식감을 위한 실온 보관."
  },
  {
    name: "버터",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "지방군",
    description: "유지류 축산물. 풍미 유지를 위한 냉장 보관."
  },

  // --- 우유군 (축산물 / 냉장) ---
  {
    name: "우유",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "우유군",
    description: "신선 유제품. 0~5°C 냉장 보관 필수."
  },
  {
    name: "요거트",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "우유군",
    description: "발효 유제품. 냉장 보관 및 유통기한 준수."
  },
  {
    name: "치즈",
    storage: "냉장 식재료",
    category: "축산물",
    foodGroup: "우유군",
    description: "가공 유제품. 밀봉 후 냉장 보관."
  },

  // --- 기타 및 상세 분류 ---
  {
    name: "감자",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "곡류군",
    description: "서류(감자). 통풍이 잘되는 실온 보관."
  },
  {
    name: "고구마",
    storage: "실온 식재료",
    category: "농산물",
    foodGroup: "곡류군",
    description: "서류(고구마). 적정 온도 실온 보관."
  },
  {
    name: "조미료",
    storage: "실온 식재료",
    category: "가공식품",
    foodGroup: "지방군",
    description: "맛을 돕는 가공식품. 장류 및 조미료 실온 보관."
  }
];