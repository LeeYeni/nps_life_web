"use client";

import { ProductItem, StorageType } from "@/schema/groupBuy";
import ProductCard from "./productCard";

interface ProductGroupProps {
  title: string;
  storageType: StorageType;
  items: ProductItem[];
}

export default function ProductGroup({ title, storageType, items }: ProductGroupProps) {
  // 1. 보관 방식에 따른 헤더 포인트 컬러 설정
  const themeConfig: Record<string, string> = {
    "냉동 식재료": "border-blue-600",
    "냉장 식재료": "border-cyan-500",
    "실온 식재료": "border-orange-500",
  };

  const borderColor = themeConfig[storageType] || "border-gray-900";

  // 2. 필터링 로직 (StorageType이 한글이므로 그대로 비교하면 됩니다)
  const filteredItems = items.filter((item) => item.storage === storageType);

  if (filteredItems.length === 0) return null;

  return (
    <section className="space-y-6 mb-12">
      {/* 그룹 헤더: 보관 방식에 맞는 포인트 컬러 적용 */}
      <div className={`flex items-center gap-3 border-l-4 ${borderColor} pl-4 transition-colors`}>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* 아이템 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <ProductCard key={`${item.name}-${idx}`} item={item} />
        ))}
      </div>
    </section>
  );
}