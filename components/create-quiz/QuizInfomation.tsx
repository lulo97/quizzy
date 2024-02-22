"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "react-multi-select-component";
import { Dispatch, SetStateAction } from "react";

import { QuizInfo, Category } from "../../interfaces/CreateQuizInterfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  quizInfo: QuizInfo;
  setQuizInfo: Dispatch<SetStateAction<QuizInfo>>;
  categories: Category[];
  selectedCategories: Category[];
  setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
}

export default function PostQuizFormInfomation({
  quizInfo,
  setQuizInfo,
  categories,
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setQuizInfo((prevQuizInfo) => ({
        ...prevQuizInfo,
        title: event.target.value,
      }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuizInfo((prevQuizInfo) => ({
      ...prevQuizInfo,
      description: event.target.value,
    }));
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      setQuizInfo((prevQuizInfo) => ({
        ...prevQuizInfo,
        imageFile: selectedFile,
      }));
    }
  };  

  function handleDifficultChange(value: string) {
    setQuizInfo((prevQuizInfo) => ({
      ...prevQuizInfo,
      difficult: value,
    }));
  }

  function handleTimePerQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    const max_length = 4;
    if (event.target.value.length > max_length) {
      event.target.value = event.target.value.slice(0, max_length)
    }
    setQuizInfo((prevQuizInfo) => ({
      ...prevQuizInfo,
      time_per_q: Number(event.target.value),
    }));
  }

  return (
    <div className="w-2/3">
      {/*Title*/}
      <div className="mb-4 mt-8">
        <Label className="text-dark-1" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Title"
          onChange={(event) => handleTitleChange(event)}
          value={quizInfo.title}
        />
      </div>

      {/*Description*/}
      <div className="my-4">
        <Label className="text-dark-1" htmlFor="description">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Description"
          onChange={(event) => handleDescriptionChange(event)}
          value={quizInfo.description}
        />
      </div>

      {/*Tag*/}
      <div className="my-4">
        <Label className="text-dark-1">Category</Label>
        <MultiSelect
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          labelledBy="Select"
        />
      </div>

      {/*Time, Difficult, Image Section*/}
      <div className="my-4 flex flex-row w-full items-center justify-left gap-5">

      {/*Time per question*/}
      <div>
        <Label className="text-dark-1" htmlFor="time-per-question">
          Time for each question
        </Label>
        <Input
          id="time-per-question"
          placeholder="30"
          type="number"
          min={0}
          max={9999}
          onChange={(event) => handleTimePerQuestion(event)}
        />
      </div>

      {/*Difficult*/}
      <div>
      <Label className="text-dark-1" htmlFor="title">
          Difficult
        </Label>
        <Select onValueChange={(value) => handleDifficultChange(value)}> 
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pick level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            <SelectItem value="Extreme">Extreme</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
            </SelectGroup>
          </SelectContent>
      </Select>
      </div>

      {/*Image*/}
      <div className="my-4 flex-1">
        <Label className="text-dark-1" htmlFor="image">
          Image
        </Label>
        <Input
          id="image"
          type="file"
          placeholder="Quiz image"
          onChange={(event) => handleImageFileChange(event)}
        />
      </div>
      </div>
    </div>
  );
}
