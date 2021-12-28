import { Input } from '@mantine/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { TextControl as TextControlType } from './useControl';

interface Props {
  control: TextControlType;
}

export const TextControl = observer(({ control }: Props) => {
  return (
    <Input
      value={control.value}
      onChange={action(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          (control.value = e.target.value)
      )}
    />
  );
});
