import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Radio({ name, options, onChange, radioclass }) {
  const inputRefs = useRef([]);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find((ref) => ref.checked);
        return checked ? checked.value : undefined;
      },
      setValue(refs, value) {
        const item = refs.find((ref) => ref.value === value);
        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className={radioclass}>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <label className="mt-2">
            <input
              ref={(elRef) => (inputRefs.current[index] = elRef)}
              type="radio"
              className="form-check-input"
              onChange={(e) => {
                if (onChange) onChange(e.target.value);
              }}
              name={fieldName}
              value={option.id}
              defaultChecked={options[0].id === option.id}
            />
            <span className={option.className}>
              {option.icon} {option.label}
            </span>
          </label>
          <br />
          <small>{option.info}</small>
          <br />
        </React.Fragment>
      ))}
      {error && (
        <>
          <span className="text-danger mt-2 shake-horizontal">{error}</span>
        </>
      )}
    </div>
  );
}
