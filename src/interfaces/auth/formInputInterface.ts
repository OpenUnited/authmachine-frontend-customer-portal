import React from "react";

export interface FormInputInterface {
    label: string,
    name: string,
    placeholder: string,
    type: string,
    onChange?: (e:React.FormEvent<HTMLInputElement>) => void,
    value: string
}
