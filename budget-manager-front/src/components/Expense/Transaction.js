import React from "react";

import { ExpenseItem } from "./Items/ExpenseItem";

export const Transaction = () => {
  return (
    <div>
      <p style={{ display: "flex", justifyContent: "end" }}>
        Todas tus transacciones
      </p>
      <ExpenseItem />
    </div>
  );
};
