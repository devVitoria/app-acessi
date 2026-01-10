import { RegisterProps } from "../interface"

export interface StepMarkerProps {
    nroSteps: number,
    currentStep: boolean
    onClick: (step: number) => void
}

export interface StepOneProps {
 input: RegisterProps  
 setInput: (value: React.SetStateAction<RegisterProps>) => void 
 handleAceptTerms: () => void
 termsAccepted: boolean
 disableButton: boolean
}


export interface StepTwoProps {
 input: RegisterProps  
setEmailCode: React.Dispatch<React.SetStateAction<string>>
timeSecond: number
}