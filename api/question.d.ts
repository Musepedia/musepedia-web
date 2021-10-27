declare enum AnswerStatus {NO_ANSWER = 0, OK = 1}

export interface AnswerDTO{
  status: AnswerStatus
  answer: string;
  recommendQuestions: Array<string>;
}

export declare function getAnswer(question: string): Promise<AnswerDTO>;
