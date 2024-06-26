import React from "react";
import styled from "@emotion/styled";
import { StoryHeaderButton } from "./story-button/StoryButton";
import {
  Title,
  Text,
  TextProps,
  createPolymorphicComponent,
} from "@mantine/core";
import { StoryButtonTypes } from "../../../types";

interface Props {
  title: string;
  description?: string;
  label: string;
  storyButtons?: {
    type: StoryButtonTypes;
    url?: string;
    value?: string;
    packageName?: string;
  }[];
}

export const StoryHeader: React.FC<Props> = ({
  title,
  description,
  storyButtons,
  label,
}) => {
  const StyledDescription = createPolymorphicComponent<"button", TextProps>(
    Description
  );

  return (
    <div>
      <HeaderWrapper>
        <HeaderContent>
          <Label>{label}</Label>
          {title && <ComponentName order={1}>{title}</ComponentName>}
          {description && <StyledDescription>{description}</StyledDescription>}

          <ButtonWrapper>
            {storyButtons &&
              storyButtons.map((button) => {
                return (
                  <React.Fragment key={button.type}>
                    <StoryHeaderButton
                      type={button.type}
                      url={button.url}
                      value={button.value}
                      packageName={button.packageName}
                    />
                  </React.Fragment>
                );
              })}
          </ButtonWrapper>
        </HeaderContent>
      </HeaderWrapper>
    </div>
  );
};

const HeaderWrapper = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

const HeaderContent = styled("div")({
  minWidth: "300px",
  maxWidth: "1200px",
  flex: 1,
  borderBottom: "1px solid var(--border)",
});

const ButtonWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "32px",
  gap: "8px",
  "@media (max-width: 960px)": {
    marginBottom: "32px",
  },
});

const ComponentName = styled(Title)({
  marginBottom: "16px",
  fontSize: "3rem",
  lineHeight: "1.2",
  maxWidth: "860px",
});

const Label = styled.label({
  color: "var(--green-primary)",
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  textTransform: "uppercase",
  fontWeight: 700,
  marginBottom: 0,
  marginTop: 0,
});

const Description = styled(Text)({
  fontSize: "1.25rem",
  color: "var(--text-secondary)",
  maxWidth: "860px",
  marginBottom: "16px",
});
