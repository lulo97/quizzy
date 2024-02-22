import * as z from "zod";

export const QuizValidation = z.object({
  quizzes: z.array(z.object({
    question: z.string(),
    answers: z.array(z.string()),
    right_answers: z.array(z.number()),
    context: z.string()
  })),
  quiz_info: z.object({
    title: z.string(),
    description: z.string(),
    imageURL: z.string(),
    type: z.string(),
    categories: z.array(z.string()),
    total_quiz: z.number(),
    difficult: z.string(),
    time_per_q: z.number(),
  }),
  accountId: z.string(),
});