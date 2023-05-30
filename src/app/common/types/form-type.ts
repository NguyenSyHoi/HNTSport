export interface DataForm {
  controls: Control[]
}

export interface Control {
  name: string
  label: string
  value: string
  type: string
  validators: Validators
  options?: Options
}

export interface Validators {
  required?: boolean
  minLength?: number,
  maxLength?: number,
}

export interface Options {
  min: string
  max: string
  step: string
  icon: string
}
