import React from "react";
import { useSelector } from "react-redux";

export const AccountFilter = () => {
  const accountList = useSelector((state) => state.account.accountList);

  const accountHandler = () => {};
  return (
    <div>
      <label>Account</label>
      <select id="accountFilter" onChange={accountHandler}>
        {accountList.length > 0 &&
          accountList.map((item, index) => (
            <option key={item.id_currency} value={item.id_category}>
              {item.account_number}
            </option>
          ))}
      </select>
    </div>
  );
};
