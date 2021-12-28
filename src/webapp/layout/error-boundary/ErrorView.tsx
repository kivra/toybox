import React from "react";
import { Alert } from "@mantine/core";

interface Props {
  error: Error;
}

export function ErrorView({ error }: Props) {
  return (
    <Alert title="Bummer!" color="red" style={{ margin: 20 }}>
      Something terrible happened!
      <br /><br />
      <code>
        {error.stack}
      </code>
    </Alert>
  );
}
