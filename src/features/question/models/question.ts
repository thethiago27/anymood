export type AsyncQuestion<T, TError> =
  | { status: "loading" }
  | { status: "loaded"; data: T }
  | { status: "error"; error: TError };

export interface QuestionType {
  uid: string;
}

export interface QuestionError {
  message: string;
}
