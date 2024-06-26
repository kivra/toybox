import styled from "@emotion/styled";
import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function DarkModeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLightMode = computedColorScheme === "light";

  // https://v6.mantine.dev/styles/styled/#polymorphic-components
  const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
    DarkModeButton
  );

  return (
    <Wrapper>
      <StyledButton
        leftSection={
          isLightMode ? (
            <IconMoonFilled size={16} />
          ) : (
            <IconSunFilled size={16} />
          )
        }
        variant="default"
        onClick={() => setColorScheme(isLightMode ? "dark" : "light")}
      >
        {isLightMode ? "Dark Mode" : "Light Mode"}
      </StyledButton>
    </Wrapper>
  );
}

const DarkModeButton = styled(Button)({
  color: "var(--text-primary)",
  background: "var(--surface-400)",
  borderColor: "var(--border-distinct)",
  borderRadius: "12px",
  paddingRight: "12px",
  paddingLeft: "12px",
  height: "2.5rem",
  fontSize: "0.9375rem",
  fontWeight: "400",

  "@media (max-width: 60rem)": {
    height: "2.125rem",
  },

  "&:hover": {
    background: "var(--border-distinct)",
  },
  "&:active": {
    transform: "scale(0.99)",
    outline: "0px",
  },
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  margin: "1.5rem 0 0 0.625rem",

  "@media (max-width: 60rem)": {
    margin: "1rem 2.5rem 0",
  },
});
