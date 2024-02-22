"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Quiz from "../models/quiz.model";

interface Params {
  quizzes: {
    question: string;
    answers: string[];
    right_answers: number[];
    context: string;
  }[],
  quiz_info: {
    title: string,
    description: string,
    imageURL: string,
    type: string,
    categories: string[],
    total_quiz: number
  }
  author: string,
  path: string
}

export async function createQuiz({ quizzes, author, quiz_info, path }: Params
) {
  try {
    connectToDB();
    
    const createdQuiz = await Quiz.create({
      quizzes: quizzes,
      author: author,
      quiz_info: quiz_info
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { quizzes: createdQuiz._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create quiz: ${error.message}`);
  }
}

export async function updateQuiz(quizId: string, update_quiz: Params) {
  try {
    connectToDB();

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $set: update_quiz,
      },
      { new: true } // Return the updated document
    );

    if (!updatedQuiz) {
      throw new Error("Quiz not found");
    }

    // Assuming you need to update the user as well, modify as needed
    // Update User model or any other related models

    return updatedQuiz;
  } catch (error: any) {
    throw new Error(`Failed to update quiz: ${error.message}`);
  }
}

export async function deleteQuiz(quiz_id: string){
  try {
    await Quiz.deleteOne({ _id: quiz_id }).exec();
    console.log("Quiz deleted successfully from deleteQuiz()");
  } catch (error) {
    console.error("Error while deleting Quiz:", error);
    throw new Error("Unable to delete Quiz");
  }
}

export async function fetchPosts(
  pageNumber: number = 1,
  pageSize: number = 20,
  category: string | null = null
) {
  try {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Build the query based on whether a category is specified
    // categories property inside quiz_info property
    const query = category ? { 'quiz_info.categories': { $in: [category] } } : {};

    const posts = await Quiz.find(query)
      .sort({ createdAt: "desc" }) // Newest quiz will be on top
      .skip(skipAmount)
      .limit(pageSize)
      .exec();
    
    //{ name: 1, username: 1} = only name, username should be return
    for (const post of posts) {
      post.author = await User.findOne({ _id: post.author }, { name: 1, username: 1, image: 1, id: 1 });
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchQuizById(quizId: string) {
  connectToDB();
  try {
    const quiz = await Quiz.findById(quizId).exec();
    return quiz;
  } catch (err) {
    console.error("Error while fetching quiz:", err);
    throw new Error("Unable to fetch quiz");
  }
}

export async function fetchPostsByTitle(
  pageNumber: number = 1,
  pageSize: number = 20,
  title: string,
) {
  try {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Build the query based on the quiz title
    const query = { 'quiz_info.title': { $regex: new RegExp(title, 'i') } };

    const posts = await Quiz.find(query)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .exec();

    // Populate the author information for each post
    for (const post of posts) {
      post.author = await User.findOne({ _id: post.author }, { name: 1, username: 1, image: 1, id: 1 });
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts by name:", error);
    throw error;
  }
}

export async function fetchPostsByAuthorId(
  pageNumber: number = 1,
  pageSize: number = 20,
  authorId: string,
) {
  try {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Build the query based on the author's ID
    const query = { 'author': authorId };

    const posts = await Quiz.find(query)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .exec();

    // Populate the author information for each post
    for (const post of posts) {
      post.author = await User.findOne({ _id: post.author }, { name: 1, username: 1, image: 1, id: 1 });
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts by author ID:", error);
    throw error;
  }
}

export async function increaseAttemps(quizId: string) {
  
  connectToDB();
  try {
    const quiz = await Quiz.findById(quizId).exec(); // Find the quiz by ID

    // Check if the quiz exists
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Increase the attempts field by 1
    quiz.attempts += 1;

    // Save the updated quiz
    await quiz.save();

    console.log(`Attempts increased for quiz ${quizId}. New attempts: ${quiz.attempts}`);
  } catch (err) {
    console.error("Error while increase attemps of quiz:", err);
    throw new Error("Unable to fetch quiz");
  }
}