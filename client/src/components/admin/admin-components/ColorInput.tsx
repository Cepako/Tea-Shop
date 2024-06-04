import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';

import { FormDataInterface } from '../ProductForm';

interface colorInputProps {
  htmlFor: string;
  labelContent: string;
  inputError?: string;
  setFormData: Dispatch<SetStateAction<FormDataInterface>>;
  formDataValue: FormDataInterface;
  availableColors: string[];
}

const ColorInput: React.FC<colorInputProps> = ({
  htmlFor,
  labelContent,
  inputError,
  setFormData,
  formDataValue,
  availableColors,
}) => {
  const colorOrder = htmlFor.split('-')[0];

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      color:
        colorOrder === 'first'
          ? [value, prevValue.color ? prevValue.color[1] : '']
          : [prevValue.color ? prevValue.color[0] : '', value],
    }));
  };

  const deleteColorHandler = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      color:
        id === 'first'
          ? ['', prev.color ? prev.color[1] : '']
          : [prev.color ? prev.color[0] : '', ''],
    }));
  };
  const selectAttributes = {
    name: htmlFor,
    id: htmlFor,
    value:
      colorOrder === 'first'
        ? formDataValue.color![0] === ''
          ? 'default'
          : formDataValue.color![0]
        : formDataValue.color![1] === ''
        ? 'default'
        : formDataValue.color![1],
    onChange: handleColorChange,
  };
  return (
    <>
      <label htmlFor={htmlFor}>{labelContent}</label>
      {inputError && <p className='invalid'>{inputError}</p>}
      <div className='color'>
        <select {...selectAttributes}>
          <option value='default' disabled>
            Select {colorOrder} color
          </option>
          {availableColors.map((color) => (
            <option
              key={color}
              value={color}
              disabled={
                color ===
                (formDataValue.color
                  ? colorOrder === 'first'
                    ? formDataValue.color[1]
                    : formDataValue.color[0]
                  : '')
              }
            >
              {color}
            </option>
          ))}
        </select>
        {formDataValue.color &&
          (colorOrder === 'first'
            ? formDataValue.color[0]
            : formDataValue.color[1]) && (
            <span
              className='remove-button'
              onClick={() => deleteColorHandler(colorOrder)}
            >
              <span className='caption'>{`Delete ${colorOrder} color`}</span>❌
            </span>
          )}
      </div>
    </>
  );
};

export default ColorInput;
