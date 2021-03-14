import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import "./style.css";

export default function Input({
  name,
  label,
  className,
  placeholder,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [styleComponent, setstyleComponent] = useState("");
  const [placeholderComponent, setplaceholderComponent] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) {
      setstyleComponent(`${className} error shake-horizontal`);
      setplaceholderComponent(error);
      // setTimeout(() => {setstyleComponent()}, 2000);
    } else {
      setstyleComponent(className);
      setplaceholderComponent(placeholder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, className]);

  return (
    <>
      {label && <label className="label">{label}</label>}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onClick={() => setstyleComponent(`${className}`)}
        className={styleComponent}
        placeholder={placeholderComponent}
        {...rest}
      />
    </>
  );
}
