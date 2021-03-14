import React from "react";
import CurrencyFormat from "react-currency-format";

export default function ValueDL(value) {
  return (
    <CurrencyFormat
      value={value}
      displayType={"text"}
      thousandSeparator=","
      decimalSeparator={"."}
      prefix={"US$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}
