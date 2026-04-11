import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle.js';

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  background: #101828;
  color: #f8fafc;
`;

const Brand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.25rem;
  }

  p {
    margin: 4px 0 0;
    color: #cbd5e1;
    font-size: 0.9rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 12px;
`;

const NavLink = styled(Link)`
  padding: 10px 14px;
  border-radius: 999px;
  text-decoration: none;
  background: ${props => (props.$active ? '#2563eb' : 'rgba(255,255,255,0.08)')};
`;

const Main = styled.main`
  flex: 1;
  padding: 20px 24px 24px;
`;

const AppShell = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Header>
          <Brand>
            <h1>Factory Map 2</h1>
            <p>React + Express rewrite of the legacy factory storage map.</p>
          </Brand>
          <Nav>
            <NavLink to="/maps/main" $active={location.pathname === '/maps/main'}>
              全區總覽
            </NavLink>
            <NavLink to="/admin/storage" $active={location.pathname === '/admin/storage'}>
              儲位管理
            </NavLink>
          </Nav>
        </Header>
        <Main>{children}</Main>
      </Shell>
    </>
  );
};

export default AppShell;
