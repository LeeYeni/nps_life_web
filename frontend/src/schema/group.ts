/**
 * 이미지 기반 식재료 및 생활용품 상세 스키마
 */

// 1. 보관 형태에 따른 분류 (이미지 1번 항목)
export type StorageType = 'FREEZE' | 'REFRIGERATED' | 'ROOM_TEMPERATURE';

// 2. 원료 및 원산지에 따른 분류 (이미지 2번 항목)
export type OriginCategory = 'AGRICULTURAL' | 'LIVESTOCK' | 'MARINE' | 'PROCESSED';

// 3. 식단 구성에 따른 식품군 분류 (이미지 3번 항목)
export type FoodGroup = 'GRAIN' | 'MEAT_FISH' | 'VEGETABLE' | 'FAT' | 'MILK' | 'FRUIT' | 'NON_FOOD';

export interface ProductItem {
  name: string;
  storage: StorageType;      // 예: 냉동, 냉장, 실온
  category: OriginCategory;  // 예: 농산물, 축산물 등
  foodGroup: FoodGroup;      // 예: 곡류군, 어육류군 등
  totalQuantity: number;     // 전체 수량 (예: 12)
  unit: string;              // 소분 단위 (예: "3롤", "500g")
  description: string;       // 검수 및 보관 기준 (예: "영하 18도 이하 보관")
}