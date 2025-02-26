export type AnswerMC = {
    answer: string,
    checked: boolean
}

export type AnswersMC = Array<AnswerMC>

export type AnswerMatching = {
    answer: string,
    number: number | null
}

export type Answersmatching = Array<AnswerMatching>