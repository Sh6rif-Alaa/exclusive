export interface ErrorValidation {
    key: string
    message: string
    path: string
    type: string
}

export type ErrorValidationType = ErrorValidation[]