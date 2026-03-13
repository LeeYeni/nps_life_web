// 1. 보관 형태에 따른 분류
export type StorageType = "냉동 식재료" | "냉장 식재료" | "실온 식재료"

// 2. 원료 및 원산지에 따른 분류
export type OriginCategory = "농산물" | "축산물" | "수산물" | "가공식품"

// 3. 식단 구성에 따른 식품군 분류
export type FoodGroup = "곡류군" | "어육류군" | "채소군" | "지방군" | "우유군" | "과일군"

export interface ProductItem {
  name: string;
  storage: StorageType;      // 예: 냉동, 냉장, 실온
  category: OriginCategory;  // 예: 농산물, 축산물 등
  foodGroup: FoodGroup;      // 예: 곡류군, 어육류군 등
  description: string;       // 검수 및 보관 기준 (예: "영하 18도 이하 보관")
}