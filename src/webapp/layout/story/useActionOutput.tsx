import { observable, runInAction } from 'mobx';
import { useState } from 'react';

export type ActionOutput = ReturnType<typeof useActionOutput>;

export function useActionOutput() {
  const [outputs] = useState(() =>
    observable<{
      name?: string | undefined;
      args: unknown[];
    }>([])
  );

  function action(name?: string | undefined): (...args: unknown[]) => void {
    return (...args) => {
      runInAction(() => {
        outputs.push({
          name,
          args,
        });
      });
    };
  }

  return {
    outputs,
    action,
  };
}
