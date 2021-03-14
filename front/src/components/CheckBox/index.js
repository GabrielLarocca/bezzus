import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import './style.css'

export default function Input({ name, label, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'checked',
        });
    }, [fieldName, registerField]);

    return (
        <>
            <input
                type="checkbox"
                ref={inputRef}
                id={name}
                defaultValue={defaultValue}
                {...rest}
            />
            {label && <label htmlFor={name} className="label ml-1 naoSelecionavel">{label}</label>}
        </>
    );
}