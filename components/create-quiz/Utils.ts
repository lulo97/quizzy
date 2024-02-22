import { Dispatch, SetStateAction } from 'react';
import { ColorMappings, QuizInfo } from "@/interfaces/CreateQuizInterfaces"
import { Quiz } from '@/interfaces/QuizInterface';
import { File } from "@web-std/file";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const LOGO_URL = "/logo.png"

//Initial function for create quiz, upload image function

export const handleTypeChange = (
    quizInfo: QuizInfo, 
    quizList: Quiz[], 
    setQuizInfo: Dispatch<SetStateAction<QuizInfo>>
  ) => {
  const updatedquizInfo = quizInfo;
  const isMCQ = quizList.some(quiz => {
    if (quiz.right_answers.length > 1) {
      return true
    }
  })
  updatedquizInfo.type = isMCQ ? "Mutiple Choice" : 'Single Choice'
  setQuizInfo(updatedquizInfo)
}

export const handleTotalQuizChange = (
  quizInfo: QuizInfo, 
  quizList: Quiz[], 
  setQuizInfo: Dispatch<SetStateAction<QuizInfo>>
) => {
  const updatedquizInfo = quizInfo;
  updatedquizInfo.total_quiz = quizList.length
  setQuizInfo(updatedquizInfo)
}

export const handleImageUrlChange = (  
  quizInfo: QuizInfo,   
  setQuizInfo: Dispatch<SetStateAction<QuizInfo>> , 
  url: string
  ) => {
  const updatedquizInfo = quizInfo;
  updatedquizInfo.imageURL = url;
  setQuizInfo(updatedquizInfo)
}

export const handleCategoryChange = (
  quizInfo: QuizInfo,   
  setQuizInfo: Dispatch<SetStateAction<QuizInfo>>,
  selectedCategories: {
    label: string;
    value: string;
}[]
) => {
  const updatedquizInfo = quizInfo;
  updatedquizInfo.categories = selectedCategories.map(obj => obj.label);
  setQuizInfo(updatedquizInfo)
}

export async function uploadToUploadThingEditMode(
  file: File, 
  quizInfo: QuizInfo,   
  oldImageUrl: string,
  setQuizInfo: Dispatch<SetStateAction<QuizInfo>> 
  ) {
  if (file.name  == "edit-blob") {
    return
  }
  try {
    const data = new FormData()
    data.set('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const img_url = data.response_utapi.data.url;
        handleImageUrlChange(            
          quizInfo,
          setQuizInfo,
          img_url)
      } else {
        console.error('Request was not successful');
      }
    })
    .catch(error => {
      console.error('Error during fetch:', error);
    });
  } catch (e: any) {
    console.error(e)
  }
}

export async function uploadToUploadThing(
    file: File, 
    quizInfo: QuizInfo,   
    setQuizInfo: Dispatch<SetStateAction<QuizInfo>> 
    ) {
    if (file.name  == "blob") {
      handleImageUrlChange(
        quizInfo,
        setQuizInfo,
        LOGO_URL
        )
      return
    }
    try {
      const data = new FormData()
      data.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const img_url = data.response_utapi.data.url;
          handleImageUrlChange(            
            quizInfo,
            setQuizInfo,
            img_url)
        } else {
          console.error('Request was not successful');
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
    } catch (e: any) {
      console.error(e)
    }
}

export function getInitialQuiz() {
    return     { 
        question: '', 
        answers: ['', '', '', ''], 
        right_answers: [0],
        context: ''
      }
}

export function getInitialQuizInfo() {
    return {
        title: '',
        description: '',
        imageFile: new File(["blob"], "blob"),
        imageURL: '',
        type: '',
        categories: [],
        total_quiz: 0,
        difficult: '',
        time_per_q: 30,
    }
}

//----------------Category section------------------------

export const CATEGORY_ARRAY = [
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
]

const COLORS = ['gray', 'teal', 'red', 'green', 'yellow', 'indigo', 'orange', 'purple', 'pink']

//Type Option of MutipleSelect have to be [{label, value}]
export const CATEGORIES = CATEGORY_ARRAY.map(ele => ({"label": ele, "value": ele}))

/*
export const colorMappings: ColorMappings = {}

//Initial colorMappings
for (let i = 0; i < CATEGORY_ARRAY.length; i++) {
  const categoryKey = flattenText(CATEGORY_ARRAY[i]);
  colorMappings[categoryKey] = `bg-${COLORS[i % COLORS.length]}-400`;
}
*/

export function flattenText(text: string) {
  return text.toLowerCase().replace(/\s+/g, '_')
}

export function unflattenText(text: string) {
  // Split the flattened text into an array of words
  const words = text.split('_');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words to form the unflattened text
  const unflattenedText = capitalizedWords.join(' ');

  return unflattenedText;
}

export function getCategoryColor(category: string, colorMappings: ColorMappings) {
  return colorMappings[flattenText(category)]
}

//----------------Function to add/delete/mark quiz------------------------

export const handleDeleteQuiz = (
  index: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  updatedQuizList.splice(index, 1);
  setQuizList(updatedQuizList);
};

export const handleAddAnswer = (
  index: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  updatedQuizList[index].answers.push("");
  setQuizList(updatedQuizList);
};

export const handleDeleteAnswer = (
  quizIndex: number,
  answerIndex: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  if (quizList[quizIndex].answers.length == 2) {
    alert("One question must have more than 2 choice");
    return;
  }
  const updatedQuizList = [...quizList];
  updatedQuizList[quizIndex].answers.splice(answerIndex, 1);
  updatedQuizList[quizIndex].right_answers = updatedQuizList[
    quizIndex
  ].right_answers.map((ele, idx) => {
    if (ele >= answerIndex) {
      return ele - 1;
    }
    return ele;
  });
  if (updatedQuizList[quizIndex].right_answers.includes(-1)) {
    updatedQuizList[quizIndex].right_answers = updatedQuizList[
      quizIndex
    ].right_answers.map((ele) => ele + 1);
  }
  updatedQuizList[quizIndex].right_answers.sort();
  setQuizList(updatedQuizList);
};

export const handleMarkAnswer = (
  quizIndex: number,
  answerIndex: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  const rightAnswers = updatedQuizList[quizIndex].right_answers;

  if (rightAnswers.length == 1 && rightAnswers.includes(answerIndex)) {
    alert("One question must have at least 1 right choice");
    return;
  }

  const index = rightAnswers.indexOf(answerIndex);

  if (index > -1) {
    rightAnswers.splice(index, 1);
  } else {
    rightAnswers.push(answerIndex);
  }
  rightAnswers.sort();
  setQuizList(updatedQuizList);
};

export const handleQuestionChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  index: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  updatedQuizList[index].question = event.target.value;
  setQuizList(updatedQuizList);
};

export const handleAnswerChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  quizIndex: number,
  answerIndex: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  updatedQuizList[quizIndex].answers[answerIndex] = event.target.value;
  setQuizList(updatedQuizList);
};

export const handleContextChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  quizIndex: number,
  quizList: Quiz[],
  setQuizList: Dispatch<SetStateAction<Quiz[]>>
) => {
  const updatedQuizList = [...quizList];
  updatedQuizList[quizIndex].context = event.target.value;
  setQuizList(updatedQuizList);
};