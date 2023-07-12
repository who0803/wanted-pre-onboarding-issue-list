import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.h1`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

function Header() {
  let {owner, repo} = useParams();

  return <HeaderContainer>{owner}/{repo}</HeaderContainer>
}

export default Header;