import { FormFieldStateModel } from "~/models/form"

const createObjectInputs: FormFieldStateModel[] = [
    {
        name: "name",
        id: 1,
        value: "",
        label: "Ime objekta",
        placeholder: "Unesi ime objekta",
        type: "input",
        minLength: 3,
        maxLength: 15,
        required: true,

        error: ""
    },
    {
        name: "address",
        id: 2,
        value: "",
        label: "Adresa objekta",
        placeholder: "Unesi adresu objekta",
        type: "input",
        required: true,
        minLength: 4,
        error: ""
    },
    {
        name: "city",
        id: 3,
        value: "",
        placeholder: "Unesi grad objekta",
        label: "Grad",
        type: "input",
        required: true,
        error: ""
    },
    {
        name: "workHours",
        id: 4,
        label: "Radno vreme",
        value: { from: 9, to: 17 },
        label: "Radno vreme",
        type: "timePicker",
        required: true,
        error: ""
    },
]

const signInInputs: FormFieldStateModel[] = [
    {
        name: "email",
        id: 1,
        value: "",
        label: "Email adresa",
        placeholder: "Unesi e-mail adresu",
        type: "input",
        required: true,
        error: ""
    },
    {
        name: "password",
        id: 2,
        value: "",
        label: "Lozinka",
        placeholder: "Unesi lozinku",
        type: "input",
        required: true,
        minLength: 6,
        maxLength: 15,
        error: ""
    },
]

const signUpInputs: FormFieldStateModel[] = [
    {
        name: "email",
        id: 1,
        value: "",
        label: "Email adresa",
        placeholder: "Unesi e-mail adresu",
        type: "input",
        required: true,
        error: ""
    },
    {
        name: "password",
        id: 2,
        value: "",
        label: "Lozinka",
        placeholder: "Unesi lozinku",
        type: "input",
        required: true,
        minLength: 6,
        maxLength: 15,
        error: ""
    },
]

const appoitmentInputData: FormFieldStateModel[] = [
    {
        name: "fullName",
        id: 1,
        value: "",
        label: "Ime i prezime",
        placeholder: "Unesi ime i prezime",
        type: "input",
        required: true,
        error: ""
    },
    {
        name: "phoneNumber",
        id: 2,
        value: "",
        label: "Broj telefona",
        placeholder: "Unesi broj telefona",
        type: "input",
        minLength: 6,
        maxLength: 15,
        error: ""
    },
    {
        name: "description",
        id: 3,
        value: "",
        label: "Beleška",
        placeholder: "Unesi belešku",
        type: "input",
        error: ""
    },
]




export {
    createObjectInputs,
    appoitmentInputData,
    signInInputs,
    signUpInputs
}