import { Switch } from '@mantine/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { BooleanControl as BooleanControlType } from './useControl';

interface Props {
  name: string;
  control: BooleanControlType;
}

export const BooleanControl = observer(({ control, name }: Props) => {
  return (
    <Switch
      label={name}
      checked={control.value}
      onChange={action(event => (control.value = event.currentTarget.checked))}
    />
  );
});
