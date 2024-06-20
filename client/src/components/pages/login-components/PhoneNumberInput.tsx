import React, { ChangeEvent } from 'react'
import InputMask from 'react-input-mask'

interface InputProps {
    phoneValue: string
    handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PhoneNumberInput: React.FC<InputProps> = ({
    phoneValue,
    handleFormChange,
}) => {
    return (
        <div className="phone-number">
            <InputMask
                mask="+48 999-999-999"
                value={phoneValue}
                onChange={handleFormChange}
                onBlur={handleFormChange}
                maskChar={null}
                placeholder="Phone Number"
            >
                {(inputProps: any) => (
                    <input
                        {...inputProps}
                        type="tel"
                        name="contact"
                        id="contact"
                        required
                    />
                )}
            </InputMask>
        </div>
    )
}

export default PhoneNumberInput
