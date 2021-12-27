import React from 'react';
import styled from '@emotion/styled';
import { Body } from './atom/typo';

export interface Props {
  type: 'github' | 'figma';
  url: string;
}

export const StoryHeaderButton: React.FC<Props> = ({ type, url }) => {
  if (type === 'github') {
    return (
      <StoryButton
        url={url}
        imgSrc="https://static.kivra.com/assets/logo/github-logo.svg"
        title="View component"
        description="GitHub"
      />
    );
  }
  return (
    <StoryButton
      url={url}
      imgSrc="https://static.kivra.com/assets/logo/figma-logo.svg"
      title="View guidelines"
      description="Figma"
    />
  );
};

const StoryButton = ({
  imgSrc,
  title,
  description,
  url,
}: {
  imgSrc: string;
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <ButtonWrapper href={url} target="_blank">
      <ButtonImage src={imgSrc} />
      <div style={{ marginRight: 12 }} />
      <ButtonText>
        <Body color="$text-primary">{title}</Body>
        <Body size="small" color="$text-secondary">
          {description}
        </Body>
      </ButtonText>
    </ButtonWrapper>
  );
};

const ButtonImage = styled('img')({
  borderRadius: '$radius-medium',
  width: '40px',
  height: '40px',
});

const ButtonText = styled('div')({
  borderRadius: '$spacing-8',
  display: 'flex',
  flexDirection: 'column',
});

const ButtonWrapper = styled('a')({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${'$border-distinct'}`,
  backgroundColor: '!!$white',
  borderRadius: '$radius-medium',
  boxShadow: '$shadow-card',
  paddingLeft: '$spacing-12',
  paddingRight: '$spacing-20',
  height: '56px',
  transition: 'transform 0.25s cubic-bezier(0.35, 0.35, 0.58, 1)',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '$shadow-card',
    transform: 'translate3d(0, -2px, 0)',
    backgroundColor: '$background-tertiary',
  },
});
