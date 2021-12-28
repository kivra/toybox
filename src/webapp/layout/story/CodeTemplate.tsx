import { Prism } from '@mantine/prism';
import { observer } from 'mobx-react-lite';
import { CodeTemplateFn } from '../../types';
import { Control } from './control/useControl';
import { childrenToString, propsToObject } from './propsToObject';

interface Props {
  codeTemplate: Exclude<CodeTemplateFn, undefined>;
  controls: Control;
}

export const CodeTamplete = observer(({ codeTemplate, controls }: Props) => {
  const props = propsToObject(Object.values(controls.state));
  return (
    <Prism language="tsx">
      {codeTemplate(props, childrenToString(controls.state['children']))}
    </Prism>
  );
});
