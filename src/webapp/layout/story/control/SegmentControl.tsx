import { SegmentedControl, Select } from '@mantine/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { SegmentControl as SegmentControlType } from './useControl';
import { ControlTitle } from './atoms';

interface Props {
  control: SegmentControlType;
  name: string;
}

export const SegmentControl = observer(({ control, name }: Props) => {
  if (control.showAs === 'segment') {
    return (
      <>
        <ControlTitle order={6}>{name}</ControlTitle>
        <SegmentedControl
          data={control.options.map(([value, label]) => ({ value, label }))}
          value={control.value}
          onChange={action(newValue => (control.value = newValue))}
        />
      </>
    );
  } else {
    return (
      <>
        <ControlTitle order={6}>{name}</ControlTitle>
        <Select
          data={control.options.map(([value, label]) => ({ value, label }))}
          value={control.value}
          onChange={action(newValue => {
            if (newValue == null) {
              console.warn(`"newValue" is ${newValue} for "${name}"`)
            }
            control.value = newValue!
          })}
          styles={{
            dropdown: { zIndex: 10000 },
          }}
        />
      </>
    );
  }
});
