export interface QuizOption {
  id: string;
  label: string;
  scores?: Record<string, number>;
}

export interface QuizQuestion {
  id: number | string;
  question: string;
  options: QuizOption[];
}

export interface QuizData {
  characters: string[];
  characterDescriptions: Record<string, string>;
  genderQuestion: QuizQuestion;
  questions: QuizQuestion[];
}
