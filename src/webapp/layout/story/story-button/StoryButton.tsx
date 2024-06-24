import React from "react";
import styled from "@emotion/styled";
import { Text, Badge } from "@mantine/core";
import { InlineCodeHighlight } from "@mantine/code-highlight";
import FigmaIcon from "./icons/figma-icon";
import GitHubIcon from "./icons/github-icon";
import { StatusVariants, StoryButtonTypes } from "../../../../types";

export interface Props {
  type: StoryButtonTypes;
  url?: string;
  packageName?: string;
  value?: string;
}

export const StoryHeaderButton: React.FC<Props> = ({
  type,
  url,
  packageName,
  value,
}) => {
  if (type === "status") {
    return <Status type={value as StatusVariants} />;
  }
  if (type === "import") {
    return <ImportStory packageName={packageName} componentName={value} />;
  }
  if (type === "github") {
    return (
      <StoryButton
        url={url ?? ""}
        icon={<GitHubIcon color="var(--text-primary)" />}
        title="Source code"
        description="GitHub"
      />
    );
  }
  if (type === "figma") {
    return (
      <StoryButton
        url={url ?? ""}
        icon={<FigmaIcon />}
        title="Design"
        description="Figma"
      />
    );
  } else {
    return null;
  }
};

const Status = ({ type }: { type: StatusVariants }) => {
  const statusStyles = {
    core: { color: "var(--green-primary)", variant: "outline" },
    notSupported: {
      color: "#B50019",
      variant: "outline",
    },
    deprecated: { color: "#B50019", variant: "filled" },
  };
  const { color, variant } = statusStyles[type];

  return (
    <FlexItem>
      <Text style={{ color: "var(--text-secondary)", minWidth: "80px" }}>
        Status
      </Text>
      <Badge
        color={color}
        variant={variant}
        size="md"
        style={{
          textTransform: "capitalize",
          fontSize: "13px",
        }}
      >
        {type}
      </Badge>
    </FlexItem>
  );
};

const ImportStory = ({
  componentName,
  packageName,
}: {
  componentName?: string;
  packageName?: string;
}) => {
  const importFrom = packageName ?? "DEFAULT_NPM_PACKAGE_NAME";
  return (
    <FlexItem>
      <Text style={{ color: "var(--text-secondary)", minWidth: "80px" }}>
        Import
      </Text>

      <InlineCodeHighlight
        code={`import { ${componentName} } from '${importFrom}';`}
        lang="tsx"
        styles={{
          code: { background: "transparent", fontSize: "14px" },
        }}
      />
    </FlexItem>
  );
};

const StoryButton = ({
  icon,
  title,
  description,
  url,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  url: string;
}) => {
  const Icon = icon;
  return (
    <ButtonWrapper href={url} target="_blank" rel="noopener noreferrer">
      <Text style={{ color: "var(--text-secondary)", minWidth: "80px" }}>
        {description}
      </Text>

      <ButtonText>
        <DecorativeIcon>{Icon}</DecorativeIcon>
        <Text
          style={{
            color: "var(--text-primary)",
            textDecoration: "underline",
            textDecorationColor: "var(--text-secondary)",
            textDecorationStyle: "dotted",
            textUnderlineOffset: "5px",
          }}
        >
          {title}
        </Text>
      </ButtonText>
    </ButtonWrapper>
  );
};

const DecorativeIcon = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
});

const ButtonText = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ButtonWrapper = styled("a")({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const FlexItem = styled("div")({
  display: "flex",
  alignItems: "center",
});
