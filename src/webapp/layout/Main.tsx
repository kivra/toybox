import styled from "@emotion/styled";
import { useMediaQuery } from "@mantine/hooks";
import { Burger as MantineBurger } from "@mantine/core";
import { useEffect, useState } from "react";
import type { NestedStoryRoute } from "../routeLoader";
import { Navbar } from "./Navbar";

interface Props {
  routes: NestedStoryRoute;
  children: JSX.Element;
}

export function Main({ routes, children }: Props) {
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    if (!isSmallScreen) {
      return setHamburgerOpen(false);
    }
  }, [isSmallScreen]);
  return (
    <Container>
      <Burger
        opened={hamburgerOpen}
        onClick={() => setHamburgerOpen(!hamburgerOpen)}
      />
      {(!isSmallScreen || hamburgerOpen) && (
        <Navbar onItemClick={() => setHamburgerOpen(false)} routes={routes} />
      )}
      <MainContent>{children}</MainContent>
    </Container>
  );
}

const Burger = styled(MantineBurger)({
  display: "none",
  "@media (max-width: 960px)": {
    zIndex: 100,
    position: "absolute",
    top: "24px",
    right: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0px",
  },
});

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "Header Header"
    "Menu Main";
  min-height: 100vh;
`;
const MainContent = styled.main`
  grid-area: Main;
  overflow: hidden;
`;
