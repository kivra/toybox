import { Group, ColorSwatch } from "@mantine/core";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { ColorControl as ColorControlType } from "./useControl";

interface Props {
  control: ColorControlType;
}

export const ColorControl = observer(({ control }: Props) => {
  return (
    <Group>
      {control.options.map((c) => {
        return (
          <ColorSwatch
            key={c}
            component="button"
            color={c}
            onClick={action(() => (control.value = c))}
            style={{
              color: "#fff",
              cursor: "pointer",
              border: control.value === c ? "5px solid black" : "none",
            }}
          />
        );
      })}
    </Group>
  );
});
