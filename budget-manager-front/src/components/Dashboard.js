import { Account } from "./Account/Account";
import { Transaction } from "./Expense/Transaction";
import NavigationBar from "./Navbar/NavigationBar";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddExpense } from "./Expense/addExpense/AddExpense";
import { AddAccount } from "./Account/AddAccount/AddAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import {
  accountForm,
  transactionForm,
} from "../store/slices/formSlice/formSlice";
import { DateFilter } from "./Filters/DateFilter/DateFilter";
const Budget = () => {
  const { showAddExpenseForm: showExpense, showAddAccountForm: showAccount } =
    useSelector((state) => state.form);
  const { alert, showAlert } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const showAddExpenseHanddler = () => {
    dispatch(transactionForm(true));
  };
  const ShowAddAccountHanddler = () => {
    dispatch(accountForm(true));
  };

  return (
    <>
      <NavigationBar />
      {showAlert && <Alert variant="danger">{alert}</Alert>}
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            {showExpense ? (
              <AddExpense />
            ) : (
              <>
                <Account />
                <div className="text-center">
                  <button onClick={ShowAddAccountHanddler}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </>
            )}
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            {showAccount ? (
              <AddAccount />
            ) : (
              <>
                <Transaction />
                <div className="text-center">
                  <button onClick={showAddExpenseHanddler}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <DateFilter />
    </>
  );
};
export default Budget;
