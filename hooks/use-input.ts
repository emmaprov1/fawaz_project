import { ChangeEvent, useState } from 'react';

const useInput = (validateValue: (val: string) => boolean) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [focus, setFocus] = useState(false);

  const valueISValid = validateValue(value);
  const hasError = !valueISValid && touched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const InputBlurHandler = () => {
    setTouched(true);
    setFocus(false);
  };

  const InputFocusHandler = () => {
    setFocus(true);
  };

  const reset = () => {
    setValue('');
    setTouched(false);
  };

  return {
    value,
    isValid: valueISValid,
    hasError,
    valueChangeHandler,
    InputBlurHandler,
    reset,
    InputFocusHandler,
    focus
  };
};

export default useInput;
