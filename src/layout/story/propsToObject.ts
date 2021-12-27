import type { CodeTemplateProps } from '../../types';

interface Prop {
  name: string;
  value?: unknown;
  defaultValue?: unknown;
  mapValueToTextProp?: (value: any) => string | undefined | null;
  excludeFromProp?: boolean;
  group?: string;
}

export function propsToObject(props: Prop[]): CodeTemplateProps {
  const createCodeTemplateProps = (groupName?: string): CodeTemplateProps => {
    const propsStrings = props
      .filter(prop => !prop.excludeFromProp)
      .filter(prop => !prop.group || prop.group === groupName)
      .map(prop => propToString(prop))
      .filter(propString => propString.length > 0);
    return {
      asArray: propsStrings,
      asMultiline(indentSpace) {
        if (this.asArray.length === 0) {
          return '';
        }
        const indent = Array(indentSpace).fill(' ').join('');
        return '\n' + this.asArray.map(p => indent + p).join('\n');
      },
      asObject: props.reduce(
        (object, current) => ({ ...object, [current.name]: current.value }),
        {}
      ),
      get asString() {
        const strProps = propsStrings.join(' ');
        if (strProps.length > 0) {
          return ` ${strProps}`;
        }
        return strProps;
      },
      toString() {
        return this.asString;
      },
      group(groupName) {
        return createCodeTemplateProps(groupName);
      },
    };
  };
  return createCodeTemplateProps();
}

export function childrenToString(children?: Prop): string {
  if (!children) {
    return '';
  }
  const { mapValueToTextProp = v => v, value } = children;
  if (!value) {
    return '';
  } else {
    return mapValueToTextProp(value);
  }
}

function propToString({
  name,
  value,
  defaultValue,
  mapValueToTextProp = v => v,
}: Prop): string {
  const type = typeof value;
  if (type === 'undefined') {
    return '';
  } else if (value === defaultValue || name === 'children') {
    return '';
  } else if (type === 'string' && (value as string).trim().length === 0) {
    return '';
  } else if (type === 'string') {
    return `${name}="${mapValueToTextProp(value)}"`;
  }

  return `${name}={${mapValueToTextProp(value)}}`;
}
