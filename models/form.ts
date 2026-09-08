interface FormFieldStateModel {
    name: string
    id: number,
    value: any
    label?: string,
    items?: any[]
    placeholder?: string,
    error: string,
    isPassword?: boolean
    type?: string,
    minLength?: number,
    maxLength?: number,
    required?: boolean
}
export type { FormFieldStateModel };
