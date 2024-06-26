import styled from "@emotion/styled";
import { useMediaQuery } from "@mantine/hooks";
import { Burger as MantineBurger, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import type { NestedStoryRoute } from "../routeLoader";
import { Navbar } from "./Navbar";
import { DarkModeToggle } from "./DarkmodeToggle";
import { cssVariables, themeSettings } from "./theme";

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
    <MantineProvider theme={themeSettings} cssVariablesResolver={cssVariables}>
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
        <MainContent>
          <DarkModeToggle />
          {children}
        </MainContent>
      </Container>
    </MantineProvider>
  );
}
const BurgerWrapper = styled.div({
  display: "none",
  "@media (max-width: 960px)": {
    border: `1px solid var(--border-distinct)`,
    background: "var(--surface-400)",
    borderRadius: "12px",
    zIndex: 2000,
    position: "absolute",
    top: "16px",
    right: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "3px",
  },
});

const Overlay = styled.div({
  zIndex: 1074,
  position: "absolute",
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 1,
  transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
});

const Container = styled.div({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "244px 1fr",
  gridTemplateRows: "auto 1fr",
  gap: "0px 0px",
  gridAutoFlow: "row",
  gridTemplateAreas: `
    "Header Header"
    "Menu Main"
  `,
  minHeight: "100vh",

  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    gridTemplateAreas: `
      "Header"
      "Main"
    `,
  },
});

const MainContent = styled.main({
  gridArea: "Main",
  overflow: "hidden",
  margin: "0 20px",
});
