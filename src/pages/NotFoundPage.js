import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  font-weight: bold;
`;

function NotFoundPage() {
  return (
    <NotFoundContainer>NotFound</NotFoundContainer>
  )
}

export default NotFoundPage;