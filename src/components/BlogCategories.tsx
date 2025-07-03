"use client";
import { useState } from "react";

export default function BlogCategories({ categories: initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);

  const handleCategoryClick = (clickedCategory) => {
    setCategories(
      categories.map((category) => ({
        ...category,
        active: category.name === clickedCategory.name,
      }))
    );
  };

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              category.active
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {category.name}
            <span
              className={`ml-2 text-sm ${
                category.active ? "text-blue-100" : "text-gray-500"
              }`}
            >
              ({category.count})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
