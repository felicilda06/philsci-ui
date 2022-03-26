import React from 'react'

type TypeProps = `text` | `password` | `radio` | `checkbox` | `date` | `time`

interface TextFieldProps {
  id: string
  type: TypeProps
  name: string
  value: string
  className?: string
  autoFocus?: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onHover?: ()=> void
  min?: any
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  value,
  type,
  className,
  autoFocus,
  min,
  ...props
}) => {
  return <input
    {...props}
    id={id}
    min={min}
    name={name}
    type={type}
    className={className}
    value={value}
    autoFocus={autoFocus}
    autoComplete={`off`}
  />
}


export default TextField