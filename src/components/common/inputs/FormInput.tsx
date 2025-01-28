import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import BaseInput from './BaseInput'
import { TextInputProps } from 'react-native'
import { FormInputProps } from '@/types/components/inputs'

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <BaseInput
          label={label}
          onChangeText={onChange}
          value={value}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  )
}

export default FormInput
