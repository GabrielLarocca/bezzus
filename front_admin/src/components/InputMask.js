import React, { useEffect, useState, useRef } from "react";
import { useField } from "@unform/core";
import InputMask from "react-input-mask";

export default function Input({ name, className, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [styleComponent, setstyleComponent] = useState("");
  const [placeholderComponent, setplaceholderComponent] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref, value) {
        ref.setInputValue(value);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, registerField]);

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
    <>
      <InputMask
        ref={inputRef}
        defaultValue={defaultValue}
        className={styleComponent}
        placeholder={placeholderComponent}
        {...rest}
      />
    </>
  );
}
