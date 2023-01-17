import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid var(--pink500);
  }

  p {
    margin-left: 1rem;
    font-size: 1.25rem;
    margin-top: 1rem;
  }
`;
