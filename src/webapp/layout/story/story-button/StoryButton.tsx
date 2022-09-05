import React from 'react';
import styled from '@emotion/styled';
import { Body } from '../atom/typo';

export interface Props {
  type: 'github' | 'figma' | 'designsystem';
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
  } else if (type === 'designsystem') {
    return (
      <StoryButton
        url={url}
        imgSrc="https://static.kivra.com/assets/logo/kivra-symbol-logo.svg"
        title="View documentation"
        description="Kivra Design System"
      />
    );
  } else {
    return (
      <StoryButton
        url={url}
        imgSrc="https://static.kivra.com/assets/logo/figma-logo.svg"
        title="View guidelines"
        description="Figma"
      />
    );
  }
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
    <ButtonWrapper href={url} target="_blank" rel="noopener noreferrer">
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
  borderRadius: '8px',
  width: '40px',
  height: '40px',
});

const ButtonText = styled('div')({
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
});

const ButtonWrapper = styled('a')({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid #d9d9d9`,
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
  paddingLeft: 12,
  paddingRight: 20,
  height: '56px',
  transition: 'transform 0.25s cubic-bezier(0.35, 0.35, 0.58, 1)',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    transform: 'translate3d(0, -2px, 0)',
    backgroundColor: '#ffffff',
  },
});
