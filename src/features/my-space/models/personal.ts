export type AsyncPersonalData<T> =
  | { status: "loading" }
  | { status: "loaded"; data: T }
  | { status: "error"; error: string };

export interface PersonalDataType {
  questionId: string;
}
