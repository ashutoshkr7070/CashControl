import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransections }) => {
  // category
  const categories = [
    "Salary",
    "Allowance",
    "Food",
    "Movie",
    "Transportation",
    "Self-development",
    "Social-Life",
    "Others",
  ];

  // calculations for all transections
  const totalTranections = allTransections.length;
  const totalIncomeTranections = allTransections.filter(
    (transection) => transection.type === "Income"
  );
  const totalExpenseTranections = allTransections.filter(
    (transection) => transection.type === "Expense"
  );
  const totalIncomePercent =
    (totalIncomeTranections.length / totalTranections) * 100;
  const totalExpensePercent =
    (totalExpenseTranections.length / totalTranections) * 100;

  // calculations for all turnovers
  const totalTurnover = allTransections.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover = allTransections
    .filter((transection) => transection.type === "Income")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalExpenseTuenover = allTransections
    .filter((transection) => transection.type === "Expense")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTuenoverPercent =
    (totalExpenseTuenover / totalTurnover) * 100;

  return (
    <>
      <div className="row mt-5 d-flex justify-content-around ">
        {/* total transections */}
        <div className="col-md-4 mb-2">
          <div className="card">
            <div className="card-header">
              Total No. of Transections : {totalTranections}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTranections.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTranections.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="m-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="m-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* total turnover */}
        <div className="col-md-4 mb-2">
          <div className="card">
            <div className="card-header">
              Total TurnOver : ₹ {totalTurnover}
            </div>
            <div className="card-body">
              <h5 className="text-success">Income : ₹ {totalIncomeTurnover}</h5>
              <h5 className="text-danger">
                Expense : ₹ {totalExpenseTuenover}
              </h5>
              <h5 className="text-dark">
                Remaining : ₹ {totalIncomeTurnover - totalExpenseTuenover}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="m-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="m-2"
                  percent={totalExpenseTuenoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 mb-4 d-flex justify-content-around ">
        {/* categorywise Income */}
        <div className="col-md-4 mb-2">
          <h4 className="mb-3" style={{font:"verdana"} }>Categorywise Income :- </h4>
          {categories.map((category) => {
            const amount = allTransections
              .filter(
                (transection) =>
                  transection.type === "Income" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 style={{ display: "inline" }}>{category}</h5>
                    <span style={{ color: "green", float: "right" }}>
                      ₹ {amount}
                    </span>
                    <Progress
                      strokeColor={"green"}
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        {/* categorywise Income */}
        <div className="col-md-4 mb-2">
          <h4 className="mb-3" style={{font:"verdana"} }>Categorywise Expenditure :- </h4>
          {categories.map((category) => {
            const amount = allTransections
              .filter(
                (transection) =>
                  transection.type === "Expense" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-2">
                  <div className="card-body">
                    <h6 style={{ display: "inline" }}>{category}</h6>
                    <span style={{ color: "red", float: "right" }}>
                      ₹ {amount}
                    </span>
                    <Progress
                      strokeColor={"red"}
                      percent={((amount / totalExpenseTuenover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
