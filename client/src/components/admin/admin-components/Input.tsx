import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FormDataInterface } from '../ProductForm';

interface inputProps {
  htmlFor: string;
  labelContent: string;
  inputError?: string;
  inputType?: string;
  placeholder?: string;
  setFormData: Dispatch<SetStateAction<FormDataInterface>>;
  formDataValue: FormDataInterface;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

const Input: React.FC<inputProps> = ({
  htmlFor,
  labelContent,
  inputError,
  inputType,
  placeholder,
  setFormData,
  formDataValue,
  options,
  min,
  max,
  step,
}) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { id, value } = e.target;

    if (id === 'type') {
      setFormData((prevValue) => ({
        ...prevValue,
        [id]: value,
        color: ['', ''],
        group: 'default',
        size: 'default',
      }));
      return;
    }

    setFormData((prevValue) => ({
      ...prevValue,
      [id]:
        id === 'price'
          ? +value < 1
            ? 1
            : +value > 1000
            ? 1000
            : +value
          : value,
    }));
  };

  const inputAttributes = {
    id: htmlFor,
    name: htmlFor,
    className: inputError ? 'invalid' : '',
    placeholder: placeholder,
    onChange: handleInputChange,
    onBlur: handleInputChange,
    value:
      inputType === 'number'
        ? formDataValue[htmlFor].toFixed(2) || ''
        : formDataValue[htmlFor] || '',
    min: min,
    max: max,
    step: step,
  };

  return (
    <>
      <label htmlFor={htmlFor}>{labelContent}</label>
      {inputError && <p className='invalid'>{inputError}</p>}
      {inputType === 'textarea' ? (
        <textarea {...inputAttributes}></textarea>
      ) : inputType === 'select' ? (
        <select {...inputAttributes}>
          <option value='default' disabled>
            Select {htmlFor}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={inputType} {...inputAttributes} />
      )}
    </>
  );
};

export default Input;
