declare enum AnswerStatus {NO_ANSWER = 0, TEXT_ANSWER = 1, IMAGE_ANSWER = 2}

export interface AnswerDTO{
  status: AnswerStatus
  answer: string;
  recommendQuestions: Array<string>;
}

export declare function getAnswer(question: string): Promise<AnswerDTO>;
