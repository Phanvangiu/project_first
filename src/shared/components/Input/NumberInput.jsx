import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  border-radius: 3px;
  width: 100%;

  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 2px solid black;
  }

  &:active {
    border: 2px solid black;
  }
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function NumberInput({ state, setState, placeholder, readOnly, className }) {
  return (
    <Input
      className={className}
      readOnly={readOnly}
      placeholder={placeholder}
      value={state}
      onChange={(ev) => {
        if (regex.test(ev.target.value) || ev.target.value == "") {
          setState(ev.target.value);
        }
      }}
    />
  );
}
