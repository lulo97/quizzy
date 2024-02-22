import { connectToDB } from "../mongoose";
import PlayData from "../models/playdata.model";
import { fetchUserById } from "./user.actions";
import { fetchQuizById } from "./quiz.actions";
import { checkAnswers, getMaxScore, getRawScore } from "@/components/quiz-result/Utils";

export async function createPlayData(
    user_id: string,
    post_id: string,
    time_taken: number,
    answers: number[][]
) {
    try {
        const new_record = new PlayData({
            user_id: user_id,
            post_id: post_id,
            time_taken: time_taken,
            answers: answers,
            createdAt: new Date(),
        });
        await new_record.save();
    } catch (error) {
        console.error("Error while creating playdata:", error);
        throw new Error("Unable to create playdata");
    }
}

export async function fetchAllPlayData(user_id: string) {
    connectToDB();
    try {
        const play_datas = await PlayData.find({'user_id': user_id}).exec();
        const play_data_details = []

        for (const play_data of play_datas) {
            const element: {[k: string]: any} = {};
            element.time_taken = play_data.time_taken;
            element.createdAt = play_data.createdAt;
            element.answers = play_data.answers;
            element.user = await fetchUserById(play_data.user_id);
            element.post = await fetchQuizById(play_data.post_id);
            const answerResult = checkAnswers(element.post.quizzes, element.answers)
            element.score = getRawScore(answerResult);
            element.max_score = getMaxScore(answerResult);
            play_data_details.push(element)
        }

        return play_data_details;
    } catch (error) {
        console.error("Error fetching play datas:", error);
        throw error;
    }
}

export async function fetchUserByPostId(post_id: string) {
    try {
        connectToDB();
        const play_datas = await PlayData.find({'post_id': post_id}).exec();
        const users_play_post = []
        for (const element of play_datas) {
            const infor: {[k: string]: any} = {};
            infor.user = await fetchUserById(element.user_id);
            const post = await fetchQuizById(element.post_id);
            const answerResult = checkAnswers(post.quizzes, element.answers)
            infor.score = getRawScore(answerResult);
            infor.max_score = getMaxScore(answerResult);
            infor.time_taken = element.time_taken;
            infor.createdAt = element.createdAt;
            users_play_post.push(infor)
        }
        return users_play_post;
    } catch (error) {
        console.error("Error fetchUserByPostId:", error);
        throw error;
    }
}
