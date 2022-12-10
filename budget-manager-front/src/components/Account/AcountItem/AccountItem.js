import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { newNotDeletedAccountList } from "../../../store/slices/formSlice/accountSlice/accountSlice";
import {
  accountForm,
  updateEnabler,
} from "../../../store/slices/formSlice/formSlice";
import { addNewAccountItem } from "../../../store/slices/formSlice/accountSlice/accountSlice";
import "./AccountItem.css";
import {
  delAccount,
  getAllAccounts,
} from "../../../store/slices/formSlice/accountSlice/thunk";

export const AccountItem = () => {
  const accountList = useSelector((store) => store.account.accountList);
  const { currencies, type } = useSelector((store) => store.category);
  const dispatch = useDispatch();

  const deleteAccount = (id) => {
    dispatch(delAccount(id));
  };

  const updateAccount = (id) => {
    const {
      id_account,
      name,
      account_type: acct_type,
      account_number,
      currency: curr,
      balance,
    } = accountList.find((i) => i.id_account === id);
    const account_type = type.map((i) => i.name).indexOf(acct_type) + 1;
    const currency = currencies.map((i) => i.name).indexOf(curr) + 1;
    const itemToUpdate = {
      id: id_account,
      name: name,
      type: account_type,
      account_number: parseInt(account_number),
      id_currency: currency,
      balance: parseFloat(balance).toFixed(2),
    };
    dispatch(updateEnabler(true));
    dispatch(accountForm(true));
    dispatch(addNewAccountItem(itemToUpdate));
  };

  useEffect(() => {
    dispatch(getAllAccounts());
  }, []);
  return accountList.length > 0 ? (
    accountList.map((i) => (
      <Container key={i.id_account} className="d-block">
        <Row className="origin_account-item">
          <Col>
            <h2>{i.name}</h2>
            <p>{i.account_number}</p>
            <h2>{i.account_type}</h2>
          </Col>
          <Col className="origin_account-item__center">
            <button onClick={() => updateAccount(i.id_account)}>
              <FontAwesomeIcon icon={faPencil} />
            </button>

            <button onClick={() => deleteAccount(i.id_account)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Col>
          <Col className="origin_account-item__last">
            <div className="origin_account-item__balance">
              {i.currency} {parseFloat(i.balance).toFixed(2)}
            </div>
            <Row>{i.type}</Row>
          </Col>
        </Row>
      </Container>
    ))
  ) : (
    <p>No Accounts to show, click the + to add an account</p>
  );
};
