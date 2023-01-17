import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8rem;

  border: 3px solid var(--purple500);
  border-radius: 3rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  background-color: white;

  span {
    margin-left: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--purple500);
  }
`;
