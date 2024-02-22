export interface Post {
    _id: string,
    __v: number,
    quizzes: Object[],
    author: { name: string; username: string; image: string; id: string; },
    quiz_info: {
      title: string,
      description: string,
      imageURL: string,
      type: string, 
      categories: Array<string>,
      total_quiz: number,
      difficult: string
    },
    createdAt: Date,
    attempts: number,
  }

  export interface QuizCardsArrayProps {
    posts: Post[]
  }