import { User } from "@/interfaces/UserInterface";
import { QuizData } from "@/interfaces/QuizInterface";

export interface PlayDataJSON {
    user_id: string,
    post_id: string,
    time_taken: number,
    answers_string: string
}

export interface PlayDataDetail {
    time_taken: number;
    createdAt: Date;
    answers: number[][];
    user: User;
    post: QuizData;
    score: number;
    max_score: number;
  }

  export interface UserPlayResult {
    user: User;
    score: number;
    max_score: number;
    time_taken: number;
    createdAt: string; // You might want to use a Date type here, adjust as needed
  }