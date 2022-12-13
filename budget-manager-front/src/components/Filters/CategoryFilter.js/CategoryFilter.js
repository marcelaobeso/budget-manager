import React from "react";
import { useSelector } from "react-redux";

export const CategoryFilter = () => {
  const { categories } = useSelector((state) => state.category);

  const categoryHandler = () => {};
  return (
    <div>
      <label>Category</label>
      <select id="categoriesFilter" onChange={categoryHandler}>
        {categories.map((item, index) => (
          <option key={item.id_currency} value={item.id_category}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
