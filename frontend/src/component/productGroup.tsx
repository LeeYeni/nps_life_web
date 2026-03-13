"use client";

import { ProductItem, StorageType } from "@/schema/group";
import ProductCard from "./productCard";

interface ProductGroupProps {
  title: string;
  storageType: StorageType;
  items: ProductItem[];
}

export default function ProductGroup({ title, storageType, items }: ProductGroupProps) {
  // 해당 그룹에 속하는 아이템만 필터링
  const filteredItems = items.filter((item) => item.storage === storageType);

  if (filteredItems.length === 0) return null;

  return (
    <section className="space-y-6 mb-12">
      {/* 그룹 헤더 */}
      <div className="flex items-center gap-3 border-l-4 border-gray-900 pl-4">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">
          {title} <span className="text-blue-600 ml-1">{filteredItems.length}</span>
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