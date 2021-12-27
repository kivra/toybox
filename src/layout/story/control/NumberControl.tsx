import { Slider } from '@mantine/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { NumberControl as NumberControlType } from './useControl';

interface Props {
  control: NumberControlType;
}

export const NumberControl = observer(({ control }: Props) => {
  return (
    <Slider
      value={control.value}
      onChange={action(value => (control.value = value))}
      min={control.min}
      max={control.max}
      step={control.step}
    />
  );
});
