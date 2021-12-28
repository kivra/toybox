import styled from '@emotion/styled';
import { NestedStoryRoute } from '../routeLoader';
import { Navbar } from './Navbar';

interface Props {
  routes: NestedStoryRoute;
  children: JSX.Element;
}

export function Main({ routes, children }: Props) {
  return (
    <Container>
      <Navbar routes={routes} />
      <MainContent>{children}</MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'Header Header'
    'Menu Main';
  min-height: 100vh;
`;
const MainContent = styled.main`
  grid-area: Main;
`;
