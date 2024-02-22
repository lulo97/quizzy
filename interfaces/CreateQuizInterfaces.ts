export interface QuizInfo {
    title: string,
    imageFile: File,
    imageURL: string,
    description: string,
    type: string,
    categories: string[],
    total_quiz: number,
    difficult: string,
    time_per_q: number
}

export interface Props {
    user_id: string;
}

export interface Category {
    value: string,
    label: string
}

export interface ColorMappings {
    [key: string]: string;
}