export type AnswerMC = {
    answer: string,
    checked: boolean
}

export type AnswersMC = Array<AnswerMC>

export type AnswerNumber = {
    answer: string,
    number: null | number
}


export type AnswerMatching = {
    answer: string,
    number: number | null
}

export type AnswersMatching = Array<AnswerMatching>

export type AnswerText = {
    answer: string,
    text?:  string
}



export type Answer = AnswersMC | AnswerNumber | AnswersMatching | AnswerText

export type Answers = Array<Answer> | Answer;

export type RightAnswers = Array<number>;

export type Question = {
    image?: string,
    question: string,
    type: string,
    list?: Array<string>
}

export type Row = {
    answers?: Answers,
    answer?: Answer
    created_at?: string,
    id?: number,
    question: Question,
    rightAnswers: RightAnswers,
    type: string,
    lf: number,
    thema: string,
    apOne: boolean
}

export type Rows = Array<Row>;

export type ErrorType = {
    message: string,
    type: "question" | "list" | "url" | "optionsMc" | "optionsMatching" | "answerNumber" | "answerText" | "rightAnswer" | "matchingError";
};