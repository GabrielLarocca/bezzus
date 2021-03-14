import React, { useEffect, useState, useRef } from "react";
import { useField } from "@unform/core";
import NumberFormat from "react-number-format";

export default function Currency({ name, className, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    onChangeEvent,
  } = useField(name);

  const [value, setvalue] = useState("");

  const [styleComponent, setstyleComponent] = useState("");
  const [placeholderComponent, setplaceholderComponent] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      getValue() {
        return value;
      },
      setValue(ref) {
        setvalue(value);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, value, registerField, onChangeEvent]);

  useEffect(() => {
    if (error) {
      setstyleComponent(`${className} error shake-horizontal`);
      setplaceholderComponent(error);
    } else {
      setstyleComponent(className);
      setplaceholderComponent(placeholder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, className]);

  return (
    <NumberFormat
      type="text"
      ref={inputRef}
      className={styleComponent}
      placeholder={placeholderComponent}
      value={value}
      onChangeEvent={(e) => {
          console.log("e", e);
        setvalue(e.target.value)
      }}
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"R$"}
      {...rest}
    />
  );
}
