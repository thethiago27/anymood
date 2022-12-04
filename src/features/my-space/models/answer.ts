export type AsyncAnswers<T, TError> =
  | { status: "loading" }
  | { status: "loaded"; data: T }
  | { status: "error"; error: TError };

export interface AnswersType {
  answer: string;
  id: string;
}

export interface AnswersError {
  message: string;
}
