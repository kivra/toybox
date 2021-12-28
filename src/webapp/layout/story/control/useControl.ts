import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';

type ColorValue = string;
const colorValues = ['green', 'blue', 'red'];

type ControlTypes =
  | ColorControl
  | TextControl
  | NumberControl
  | BooleanControl
  | SegmentControl
  | ButtonControl;

interface BaseControl<Type> {
  defaultValue?: Type;
  name: string;
  displayName?: string;
  description?: string;
  excludeFromProp?: boolean;
  group?: string;
}

export interface ButtonControl extends BaseControl<never> {
  type: 'button';
  value: () => any;
}

export interface ColorControl extends BaseControl<string> {
  type: 'color';
  options: ColorValue[];
  value?: ColorValue;
}

export interface TextControl extends BaseControl<string> {
  type: 'text';
  value?: string;
}

export interface NumberControl extends BaseControl<number> {
  type: 'number';
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface BooleanControl extends BaseControl<boolean> {
  type: 'boolean';
  value: boolean;
  mapValueToTextProp?: (value: boolean) => string | undefined | null;
}

export declare type SegmentBaseTypes = string; // | number | null | undefined; <SegmentedControl /> Only support strings
export interface SegmentControl<T = SegmentBaseTypes> extends BaseControl<T> {
  type: 'segment';
  showAs: 'segment' | 'select';
  options: [value: T, name: string][];
  value?: T;
}

export type Control = ReturnType<typeof useControl>;

export function useControl() {
  const controlState = useLocalObservable<Record<string, ControlTypes>>(
    () => ({})
  );

  function createNewControl<Type extends ControlTypes>(
    name: string,
    control: Type
  ): Type['value'] {
    if (!controlState[name]) {
      runInAction(() => {
        let displayName =
          control.displayName ||
          control.name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
        displayName =
          displayName.charAt(0).toUpperCase() + displayName.slice(1);
        const value = (control.value ?? control.defaultValue) as any;
        controlState[name] = {
          ...control,
          displayName,
          value,
        };
      });
    }
    return controlState[name]?.value as any;
  }

  function button(name: string, cb: ButtonControl['value']) {
    return createNewControl<ButtonControl>(name, {
      type: 'button',
      value: cb,
      name,
      excludeFromProp: true,
    });
  }

  function boolean({
    name,
    displayName,
    value = false,
    description,
    mapValueToTextProp,
    excludeFromProp,
    group,
  }: {
    name: string;
    displayName?: string;
    value?: boolean;
    defaultValue?: boolean;
    description?: string;
    mapValueToTextProp?: BooleanControl['mapValueToTextProp'];
    excludeFromProp?: boolean;
    group?: string;
  }): BooleanControl['value'] {
    return createNewControl<BooleanControl>(name, {
      type: 'boolean',
      value,
      defaultValue: value,
      mapValueToTextProp,
      name,
      displayName,
      description,
      excludeFromProp,
      group,
    });
  }

  function segment<
    Options extends SegmentBaseTypes,
    Value extends SegmentControl<Options>['value']
  >({
    name,
    displayName,
    value,
    defaultValue,
    options,
    showAs = 'segment',
    excludeFromProp,
    group,
  }: {
    name: string;
    displayName?: string;
    value?: Value;
    defaultValue?: Value;
    options: SegmentControl<Options>['options'];
    showAs?: SegmentControl<Options>['showAs'];
    excludeFromProp?: boolean;
    group?: string;
  }): Value extends undefined
    ? SegmentControl<Options>['value']
    : Required<SegmentControl<Options>>['value'] {
    return createNewControl<SegmentControl<Options>>(name, {
      type: 'segment',
      name,
      displayName,
      value,
      defaultValue,
      options,
      showAs,
      excludeFromProp,
      group,
    }) as any;
  }

  function color<Value extends ColorControl['value']>({
    name,
    displayName,
    value,
    defaultValue,
    options,
    excludeFromProp,
    group,
  }: {
    name: string;
    displayName?: string;
    value?: Value;
    defaultValue?: string;
    options?: ColorValue[];
    excludeFromProp?: boolean;
    group?: string;
  }): Value extends string
    ? Exclude<ColorControl['value'], undefined>
    : ColorControl['value'] {
    const defaultColors = colorValues as ColorValue[];

    return createNewControl<ColorControl>(name, {
      type: 'color',
      name,
      displayName,
      value,
      defaultValue,
      options: options || defaultColors,
      excludeFromProp,
      group,
    }) as any;
  }

  function text<Value extends TextControl['value']>({
    name,
    displayName,
    value,
    defaultValue,
    description,
    excludeFromProp,
    group,
  }: {
    name: string;
    displayName?: string;
    value?: Value;
    defaultValue?: string;
    description?: string;
    excludeFromProp?: boolean;
    group?: string;
  }): Value extends string
    ? Exclude<TextControl['value'], undefined>
    : TextControl['value'] {
    return createNewControl<TextControl>(name, {
      type: 'text',
      name,
      displayName,
      value,
      defaultValue,
      description,
      excludeFromProp,
      group,
    }) as any;
  }

  function number<Value extends NumberControl['value']>({
    name,
    displayName,
    value,
    defaultValue,
    description,
    min,
    max,
    step,
    excludeFromProp,
    group,
  }: {
    name: string;
    displayName?: string;
    value?: Value;
    defaultValue?: number;
    description?: string;
    min?: number;
    max?: number;
    step?: number;
    excludeFromProp?: boolean;
    group?: string;
  }): Value extends number
    ? Exclude<NumberControl['value'], undefined>
    : NumberControl['value'] {
    return createNewControl<NumberControl>(name, {
      type: 'number',
      name,
      displayName,
      value,
      defaultValue,
      description,
      min,
      max,
      step,
      excludeFromProp,
      group,
    }) as any;
  }

  return {
    state: controlState,
    text,
    number,
    boolean,
    color,
    segment,
    button,
  };
}
