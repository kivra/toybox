import styled from '@emotion/styled';
import { Switch, Text, Button } from '@mantine/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { ControlTitle } from './atoms';
import { BooleanControl } from './BooleanControl';
import { ColorControl } from './ColorControl';
import { SegmentControl } from './SegmentControl';
import { TextControl } from './TextControl';
import { NumberControl } from './NumberControl';
import { Control } from './useControl';
import { DarkMode } from './useIsDarkMode';

interface Props {
  controls: Control;
  darkMode: DarkMode;
}

export const Controls = observer(({ controls, darkMode }: Props) => {
  return (
    <>
      <Switch
        label="Darkmode"
        checked={darkMode.isDarkMode}
        onChange={action(event =>
          darkMode.setIsDarkMode(event.currentTarget.checked)
        )}
      />
      <ControlSpace />
      {Object.entries(controls.state).map(([name, control]) => {
        switch (control.type) {
          case 'color':
            return (
              <Fragment key={name}>
                <ControlTitle order={6}>{control.displayName}</ControlTitle>
                <ColorControl control={control} />
                <ControlSpace />
              </Fragment>
            );
          case 'boolean':
            return (
              <Fragment key={name}>
                <Text size="xs" color="gray" style={{ marginBottom: '8px' }}>
                  {control.description}
                </Text>
                <BooleanControl
                  key={name}
                  control={control}
                  name={control.displayName!}
                />
                <ControlSpace />
              </Fragment>
            );
          case 'text':
            return (
              <Fragment key={name}>
                <ControlTitle order={6}>{control.displayName}</ControlTitle>
                <Text size="xs" color="gray" style={{ marginBottom: '8px' }}>
                  {control.description}
                </Text>
                <TextControl control={control} />
                <ControlSpace />
              </Fragment>
            );
          case 'number':
            return (
              <Fragment key={name}>
                <ControlTitle order={6}>{control.displayName}</ControlTitle>
                <Text size="xs" color="gray" style={{ marginBottom: '8px' }}>
                  {control.description}
                </Text>
                <NumberControl control={control} />
                <ControlSpace />
              </Fragment>
            );
          case 'segment':
            return (
              <Fragment key={name}>
                <SegmentControl control={control} name={control.displayName!} />
                <ControlSpace />
              </Fragment>
            );
          case 'button':
            return (
              <Fragment key={name}>
                <Button children={control.name} onClick={control.value} />
                <ControlSpace />
              </Fragment>
            );
          default:
            return null;
        }
      })}
    </>
  );
});

const ControlSpace = styled.div`
  margin-bottom: 12px;
`;
