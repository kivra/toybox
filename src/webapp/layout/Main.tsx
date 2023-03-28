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
      <BurgerWrapper>
        <MantineBurger
          size="sm"
          opened={hamburgerOpen}
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
        />
      </BurgerWrapper>
      {(!isSmallScreen || hamburgerOpen) && (
        <Navbar onItemClick={() => setHamburgerOpen(false)} routes={routes} />
      )}
      {hamburgerOpen && <Overlay onClick={() => setHamburgerOpen(false)} />}
      <MainContent>{children}</MainContent>
    </Container>
  );
}
const BurgerWrapper = styled.div({
  display: "none",
  "@media (max-width: 960px)": {
    border: `1px solid #d9d9d9`,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
    zIndex: 2000,
    position: "absolute",
    top: "28px",
    right: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2px",
  },
});

const Overlay = styled.div`
  z-index: 1074;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const Container = styled.div`
  position: relative;
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
