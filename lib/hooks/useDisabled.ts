import React, { useCallback, useState } from 'react';

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

function useDisabled() {
  const [disabled, setDisabled] = useState(false);

  const disableButton = useCallback(async () => {
    setDisabled(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    setDisabled(false);
  }, []);

  function getDisabledProps<Props>({
    onClick,
    ...props
  }: {
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'] & Props;
  }) {
    return {
      onClick: callAll(onClick, disableButton),
      disabled: disabled,
      ...props,
    };
  }

  return { disabled, disableButton, getDisabledProps };
}

export { useDisabled };
