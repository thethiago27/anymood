import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;

  padding: 0 2rem;

  @media (max-width: 720px) {
    height: calc(100vh - 5.25rem);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 4.25rem);
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin: 1rem 0 1.5rem;
`;
