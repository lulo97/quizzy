export interface Quiz {
  question: string;
  right_answers: number[]; // You might need to define QuizAnswer
  answers: string[]; // You might need to define QuizAnswer
  context: string;
}
  
export interface Author {
  _id: string;
  id: string;
  image: string;
  name: string;
  username: string;
}
  
export interface QuizInfoNoFile {
  title: string;
  description: string;
  imageURL: string;
  type: string;
  categories: string[];
  total_quiz: number;
  difficult: string;
  time_per_q: number;
}
  
export interface QuizData {
  _id: string;
  quizzes: Quiz[];
  author: Author;
  attempts: number;
  quiz_info: QuizInfoNoFile;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Comment {
  _id: string,
  text: string;
  post_id: string;
  author_id: string;
  createdAt: Date;
}

/*
{
  _id: new ObjectId("657eb0238b6038cce3af7d9e"),
  quizzes: [
    {
      question: "Which planet is known as the 'Red Planet'?",
      right_answers: [Array],
      answers: [Array],
      context: 'Astronomy'
    },
    {
      question: 'What is the chemical symbol for gold?',
      right_answers: [Array],
      answers: [Array],
      context: 'Chemistry'
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      right_answers: [Array],
      answers: [Array],
      context: 'Literature'
    },
    {
      question: 'Which programming language is known for its simplicity and readability?',
      right_answers: [Array],
      answers: [Array],
      context: 'Computer Science'
    }
  ],
  author: {
    _id: new ObjectId("657eadd78b6038cce3af7d9c"),
    id: 'user_2Y1bR9vyshAAdu8GX5RUuUOmqi4',
    image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWTFiUjlvVUJMMElPUFJMSWdrNXhxM2FwVEUifQ',
    name: 'Mộng Kỳ',
    username: 'luongpysl2'
  },
  attempts: 1,
  quiz_info: {
    title: 'Mixed Knowledge Quiz',
    description: 'A quiz with questions from various fields!',
    imageURL: 'https://utfs.io/f/68fc4d3e-5926-47ea-84ad-8ab2c6b39864-1zbfv.png',
    type: 'Multiple Choice',
    categories: [
      'General',
      'Physics',
      'Chemistry',
      'Biology',
      'Earth Science',
      'Astronomy',
      'Environmental Science',
      'Psychology',
      'Sociology',
      'Anthropology',
      'Political Science',
      'Economics',
      'History',
      'Computer Science'
    ],
    total_quiz: 4
  },
  createdAt: 2023-12-18T15:20:45.678Z,
  updatedAt: 2023-12-18T15:20:45.678Z,
  __v: 0,
  updateAt: 2023-12-17T08:32:13.040Z
}
*/

  