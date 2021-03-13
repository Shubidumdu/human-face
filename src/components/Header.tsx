import styled from 'styled-components';
import React from 'react';
import logoImg from '../imgs/title-medium2.png';

const StyleHeader = styled.header`
  background-color: ${({ theme }) => theme.color.darkbrown};
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px ${({ theme }) => theme.color.black};
  position: fixed;

  @media (max-width: 426px) {
    display: none;
  }
`;

const HeaderLogo = styled.img`
  height: 80%;
  width: auto;
`;

const Header: React.FC = () => {
  return (
    <StyleHeader>
      <HeaderLogo src={logoImg} />
    </StyleHeader>
  );
};

export default Header;
