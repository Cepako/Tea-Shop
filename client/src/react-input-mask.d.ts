declare module 'react-input-mask' {
  import * as React from 'react';

  interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    alwaysShowMask?: boolean;
    formatChars?: {
      [key: string]: string;
    };
    beforeMaskedValueChange?: (
      newState: any,
      oldState: any,
      userInput: string
    ) => any;
    children?: (inputProps: any) => React.ReactNode;
  }

  class InputMask extends React.Component<InputMaskProps> {}

  export default InputMask;
}
