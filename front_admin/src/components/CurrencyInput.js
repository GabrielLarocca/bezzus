import React, { useEffect, useState, useRef } from "react";
import { useField } from "@unform/core";
import CurrencyInput from "react-currency-input";

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
      setValue(ref, value) {
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
    <React.Fragment>
      <CurrencyInput
        ref={inputRef}
        value={value}
        className={styleComponent}
        placeholder={placeholderComponent}
        onChangeEvent={(e) => setvalue(e.target.value)}
        defaultValue={defaultValue}
        {...rest}
      />
    </React.Fragment>
  );
}
