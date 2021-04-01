import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
  name: string;
  icon?: string;
  children?: ReactNode;
  placeholder: string;
}

const Input = ({ name, icon: Icon, placeholder, ...children }: Props) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {Icon && <Icon size={20} />} */}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        {...children}
      />
    </Container>
  );
};

export default Input;
