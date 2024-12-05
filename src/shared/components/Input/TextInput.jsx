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

export default function TextInput({ state, setState, placeholder, type, className, readOnly }) {
  return (
    <Input
      readOnly={readOnly}
      className={className}
      type={type}
      placeholder={placeholder}
      value={state}
      onChange={(ev) => {
        setState(ev.target.value);
      }}
    />
  );
}
