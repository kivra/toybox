import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Code, TextInput } from "@mantine/core";
import { SearchIcon } from "../icons/SearchIcon";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NestedStoryRoute } from "../routeLoader";

interface Props {
  routes: NestedStoryRoute;
  onItemClick: () => void;
}

export function Navbar({ routes, onItemClick }: Props) {
  return (
    <Wrapper>
      <ScrollWrap>
        <TopWrap href="/">
          <img
            src="https://static.kivra.com/img/logo/kivra-green-k.svg"
            style={{ marginRight: "16px" }}
            alt=""
          />
          <Title>NAVBAR_TITLE</Title>
        </TopWrap>
        <InnerWrapper>
          <MenuItems routes={routes} onItemClick={onItemClick} />
        </InnerWrapper>
        <CodeWrapper>
          <Code style={{ marginLeft: 16 }}>
            {import.meta.env.TOYBOX_APP_VERSION}
          </Code>
        </CodeWrapper>
      </ScrollWrap>
    </Wrapper>
  );
}

function MenuItems({ routes, onItemClick }: Props) {
  const { activeStoryUrl, searchString, setSearchString, stories } =
    useStoriesList(routes);

  return (
    <>
      <SearchBar>
        <TextInput
          leftSection={<SearchIcon />}
          placeholder="Search"
          radius="md"
          size="md"
          value={searchString}
          classNames={{
            input: css({
              backgroundColor: "var(--surface-white)",
              borderColor: "var(--border-none-dark)",
              borderRadius: "12px",
              color: "rgba(0, 0, 0, 0.65)",
              "&::placeholder": {
                color: "rgba(0, 0, 0, 0.65)",
              },
              "&:focus": {
                borderColor: "var(--green-primary)",
              },
            }),
          }}
          onChange={(e: any) => setSearchString(e.target.value)}
        />
      </SearchBar>
      {stories.map(([name, { stories }]) => {
        return (
          <div key={name}>
            <CategoryTitle>{name}</CategoryTitle>
            {stories.map((story) => {
              const activeLink = activeStoryUrl === story.urlPath;
              return (
                <MenuItemWrapper
                  key={story.urlPath}
                  style={{ padding: "6px 12px" }}
                  activeLink={activeLink}
                >
                  <MenuItem
                    onClick={onItemClick}
                    key={story.urlPath}
                    to={story.urlPath}
                    activeLink={activeStoryUrl === story.urlPath}
                  >
                    {story.name.startsWith("use")
                      ? story.name
                      : story.name.replace(/(?<!^)([A-Z])/g, " $1")}
                  </MenuItem>
                </MenuItemWrapper>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

const isStringMatch = (haystack: string, searchFor: string): boolean => {
  if (!searchFor) {
    return true;
  }
  return haystack.toLowerCase().includes(searchFor.toLowerCase());
};

const useStoriesList = (routes: NestedStoryRoute) => {
  const location = useLocation();
  const routesEntries = Array.from(routes.entries());
  const [searchString, setSearchString] = useState("");
  const stories = routesEntries.map(
    ([name, { stories }]) =>
      [
        name,
        {
          stories: stories.filter((s) => isStringMatch(s.name, searchString)),
        },
      ] as const
  );
  const allAccordionValues = routesEntries.map(([name]) => name);
  const [accordionValues, setAccordionValues] =
    useState<string[]>(allAccordionValues);

  return {
    activeStoryUrl: location.pathname,
    stories,
    searchString,
    setSearchString,
    accordionValues,
    setAccordionValues,
  };
};

const Wrapper = styled.div({
  zIndex: 1075,
  gridArea: "Menu",
  position: "relative",
  padding: "16px",

  "@media (max-width: 960px)": {
    backgroundColor: "var(--surface-100)",
    position: "fixed",
    left: "0",
  },
});

const ScrollWrap = styled.div({
  top: "0",
  position: "sticky",
  overflowY: "auto",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const TopWrap = styled.a({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: "24px",
  textDecoration: "none",
});

const InnerWrapper = styled.div({
  marginBottom: 20,
  fontWeight: "normal",
});

const CodeWrapper = styled.div({
  marginTop: "auto",
  marginBottom: "125px",
});

const MenuItem = styled(Link, { shouldForwardProp: (p) => p !== "activeLink" })(
  (p: { activeLink: boolean }) => ({
    fontWeight: p.activeLink ? 500 : 400,
    fontSize: "15px",

    textDecoration: "none",
    display: "block",
    color: "var(--text-primary)",
  })
);

const MenuItemWrapper = styled.div(
  ({ activeLink }: { activeLink: boolean }) => ({
    backgroundColor: activeLink ? "var(--surface-300)" : "transparent",
    borderRadius: "12px",
    ":hover": {
      backgroundColor: "var(--surface-300)",
    },
    ":active": {
      transform: "scale(0.99)",
    },
  })
);

const SearchBar = styled.div({
  margin: "0px 0px 24px 0px",
});

const CategoryTitle = styled.p({
  color: "var(--green-primary)",
  fontSize: "0.875rem",
  fontWeight: 700,
  textTransform: "uppercase",
  marginTop: "0.75rem",
  marginBottom: "0.5rem",
});

/**
 * Title of the application, eg. React Components
 */
const Title = styled.h1({
  color: "var(--text-primary)",
  margin: 0,
  whiteSpace: "break-spaces",
  width: "min-content",
  fontSize: "1.25rem",
  lineHeight: "1.375rem",
});
