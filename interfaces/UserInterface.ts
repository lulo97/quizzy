import { QuizData } from "./QuizInterface";

export interface User {
    _id: string;
    id: string;
    __v: number;
    bio: string;
    communities: any[]; // You may want to replace 'any[]' with a more specific type if possible
    image: string;
    name: string;
    onboarded: boolean;
    quizzes: QuizData[]; // Assuming quizzes are represented by an array of string identifiers
    username: string;
}

/*
{
    "_id": "65a241579ac452e67848c8c2",
    "id": "user_2Y1bR9vyshAAdu8GX5RUuUOmqi4",
    "__v": 0,
    "bio": "Xin chào mọi người, mình tên là Lương thích xem phim và nghe nhạc nhẹ.",
    "communities": [],
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWTFiUjlvVUJMMElPUFJMSWdrNXhxM2FwVEUifQ",
    "name": "Lê Lương",
    "onboarded": true,
    "quizzes": [
        "65a2427531535d29f61c59b1"
    ],
    "username": "luongpysl"
}
*/