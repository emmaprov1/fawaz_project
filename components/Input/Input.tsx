import { FC, ChangeEvent, HTMLProps } from 'react';

interface inputHandlers {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  InputBlurHandler: () => void;
  reset: () => void;
  InputFocusHandler: () => void;
  focus: boolean;
}

interface INPUT {
  handlers: inputHandlers;
}

const Input: FC<INPUT & HTMLProps<HTMLInputElement>> = ({
  handlers,
  ...props
}) => {
  return (
    <input
      {...props}
      onBlur={handlers.InputBlurHandler}
      onChange={handlers.valueChangeHandler}
      value={handlers.value}
      onFocus={handlers.InputFocusHandler}
      className={`${handlers.hasError ? ' signIn-invalid' : ''} ${
        handlers.focus ? 'signIn-focus' : ''
      }`}
    />
  );
};

export default Input;
