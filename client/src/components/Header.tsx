import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 2rem 1rem;
  text-align: center;
  background-color: #000;
  color: #fff;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  color: #ccc;
  font-size: 1rem;
  letter-spacing: 1px;
`;

function Header() {
    return (
        <HeaderContainer>
            <Title>NEXT TUNES</Title>
            <Subtitle>SEARCH FOR YOUR FAVOURITE MUSIC</Subtitle>
        </HeaderContainer>
    );
}

export default Header;