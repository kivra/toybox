import React from 'react';
import styled from '@emotion/styled';
import { StoryHeader as StoryHeaderProps } from '../../../types';
import { StoryHeaderButton } from './StoryButton';
import { Body, Display } from './atom/typo';

export const StoryHeader: React.FC<StoryHeaderProps> = ({
  title,
  description,
  storyButtons,
}) => {
  const isDescriptionComponent = typeof description !== 'string';
  return (
    <div>
      <HeaderWrapper>
        <HeaderContent>
          {title && <HeaderTitle gutterBottom={false}>{title}</HeaderTitle>}
          {isDescriptionComponent ? (
            description
          ) : (
            <HeaderDescription>{description}</HeaderDescription>
          )}
          <div style={{ marginBottom: 32 }} />
          <ButtonWrapper>
            {storyButtons &&
              storyButtons.map(
                button =>
                  button.url && (
                    <React.Fragment key={button.type}>
                      <StoryHeaderButton type={button.type} url={button.url} />
                      <div style={{ marginRight: 16 }} />
                    </React.Fragment>
                  )
              )}
          </ButtonWrapper>
          <div style={{ marginBottom: 66 }} />
        </HeaderContent>
      </HeaderWrapper>
    </div>
  );
};

const HeaderWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '1px solid #EEEE',
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
});

const HeaderContent = styled('div')({
  paddingTop: '56px',
  paddingLeft: '40px',
  paddingRight: '40px',
  minWidth: 300,
  maxWidth: 1280,
  flex: 1,
  marginTop: '20px',
});

const HeaderTitle = styled(Display)({
  fontSize: '3rem',
  marginBottom: '24px',
});

const HeaderDescription = styled(Body)({
  fontSize: '1.2rem',
  lineHeight: '1.4',
  maxWidth: '600px',
  color: '#000',
});

const ButtonWrapper = styled('div')({
  display: 'flex',
});
