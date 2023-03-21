import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Code, Input } from "@mantine/core";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
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
        <TopWrap>
          <img
            src="https://static.kivra.com/img/logo/kivra-green-k.svg"
            style={{ marginRight: "16px" }}
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
  const {
    accordionValues,
    activeStoryUrl,
    searchString,
    setAccordionValues,
    setSearchString,
    stories,
  } = useStoriesList(routes);

  return (
    <>
      <div style={{ margin: "0px 16px 38px 16px" }}>
        <Input
          icon={<SearchIcon />}
          placeholder="Search"
          radius="md"
          size="md"
          value={searchString}
          classNames={{
            input: css({
              fontSize: 14,
              color: "#212121",
              "&::placeholder": {
                color: "#6A6A6A",
              },
              "&:focus": {
                borderColor: "#5CA600",
              },
            }),
          }}
          onChange={(e: any) => setSearchString(e.target.value)}
        />
      </div>
      {stories.map(([name, { stories, subfolders }]) => {
        return (
          <div key={name}>
            <Accordion.Root
              type="multiple"
              onValueChange={setAccordionValues}
              value={accordionValues}
            >
              <Accordion.Item value={name}>
                <AccordionHeader>
                  <AccordionTrigger>
                    <AccordionTitle>{name}</AccordionTitle>
                    <AccordionIcon />
                  </AccordionTrigger>
                </AccordionHeader>
                <Accordion.Content>
                  {subfolders.map((subfolder) => {
                    if (subfolder.stories.length === 0) {
                      return null;
                    }
                    return (
                      <div key={subfolder.head}>
                        <Overline>{subfolder.head}</Overline>
                        {subfolder.stories.map((story) => {
                          const activeLink =
                            location.pathname === story.urlPath;
                          return (
                            <MenuItemWrapper
                              key={story.urlPath}
                              activeLink={activeLink}
                            >
                              <MenuItem
                                onClick={onItemClick}
                                to={story.urlPath}
                                style={{ padding: "10px 0 10px 28px" }}
                                activeLink={activeLink}
                              >
                                {story.name}
                              </MenuItem>
                            </MenuItemWrapper>
                          );
                        })}
                      </div>
                    );
                  })}
                  {stories.map((story) => {
                    const activeLink = activeStoryUrl === story.urlPath;
                    return (
                      <MenuItemWrapper
                        key={story.urlPath}
                        style={{ padding: "10px 0 10px 20px" }}
                        activeLink={activeLink}
                      >
                        <MenuItem
                          onClick={onItemClick}
                          key={story.urlPath}
                          to={story.urlPath}
                          activeLink={activeStoryUrl === story.urlPath}
                        >
                          {story.name}
                        </MenuItem>
                      </MenuItemWrapper>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
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
    ([name, { stories, subfolders }]) =>
      [
        name,
        {
          stories: stories.filter((s) => isStringMatch(s.name, searchString)),
          subfolders: subfolders.map((sf) => ({
            head: sf.head,
            stories: sf.stories.filter((s) =>
              isStringMatch(s.name, searchString)
            ),
          })),
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

const AccordionHeader = styled(Accordion.Header)({
  margin: 0,
});

const AccordionTrigger = styled(Accordion.Trigger)({
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  paddingLeft: 0,
  cursor: "pointer",
  padding: "10px 12px 10px 16px",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const AccordionTitle = styled.h2({
  fontSize: 16,
  lineHeight: "20px",
  letterSpacing: "0.1px",
  color: "#212121",
  margin: 0,
  textTransform: "capitalize",
  fontWeight: "normal",
});

const AccordionIcon = styled(ArrowDownIcon)({
  transition: "transform 100ms",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

const Wrapper = styled.div({
  zIndex: 150,
  gridArea: "Menu",
  backgroundColor: "white",
  borderRight: "1px solid #e9ecef",
  position: "relative",
  boxShadow: "inset -5px -26px 24px -2px rgb(0 0 0 / 8%)",
  "@media (max-width: 960px)": {
    position: "fixed",
    left: "0",
  },
});

const ScrollWrap = styled.div({
  top: "0",
  position: "sticky",
  overflowY: "scroll",
  height: "calc(100vh + 100px)",
  display: "flex",
  flexDirection: "column",
});

const TopWrap = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "28px 16px",
  fontSize: "16px",
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
    color: "#212121",
    fontSize: "14px",
    fontWeight: p.activeLink ? "bold" : "normal",
    textDecoration: "none",
    display: "block",
  })
);

const MenuItemWrapper = styled.div(
  ({ activeLink }: { activeLink: boolean }) => ({
    borderLeft: `4px solid ${activeLink ? "#5CA600" : "transparent"}`,
    backgroundColor: activeLink ? "rgba(0, 0, 0, 0.04)" : "transparent",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  })
);

const Overline = styled.h3({
  margin: "16px 0 8px 24px",
  fontStyle: "normal",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  fontSize: 12,
  lineHeight: "14px",
  textTransform: "uppercase",
  color: "#313131",
});

/**
 * Title of the application, eg. React Components
 */
const Title = styled.h1({
  fontFamily: "'Kivra Sans', 'DM Sans', sans-serif",
  fontWeight: "bold",
  fontSize: 20,
  letterSpacing: 0.1,
  color: "#212121",
  margin: 0,
  whiteSpace: "break-spaces",
  width: "min-content",
});
