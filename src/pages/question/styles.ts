import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 2rem;

  @media (max-width: 720px) {
    height: calc(100vh - 5.25rem);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 4.25rem);
  }
`;

export const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1rem 0 1.5rem;
`;

interface FormProps {
  isError: boolean;
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 2px solid ${(props) => (props.isError ? "#FA6666" : "#a8a8b3")};
    outline: none;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem;
    border-radius: 0.5rem;
    background: #f5f5f5;
    color: ${(props) => (props.isError ? "#FA6666" : "#29292e")};
  }

  button {
    background: var(--pink500);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.8rem;
    border: 0;
    width: 100%;
    border-radius: 3rem;

    margin-top: 3rem;

    &:disabled {
      opacity: 0.6;
    }
  }

  .counter {
    font-size: 1.1rem;
    color: ${(props) => (props.isError ? "#FA6666" : "#737380")};
  }
`;

export const Warning = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
  color: var(--gray500);
`;
