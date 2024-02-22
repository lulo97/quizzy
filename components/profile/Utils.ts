import { UserPlayResult } from "@/interfaces/PlayDataInterface";
import { User } from "@/interfaces/UserInterface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function deleteQuizApiCall(
    quiz_id: string,
    router: AppRouterInstance
  ) {
    try {
        const response = await fetch("/api/quiz", {
          method: 'DELETE',
          body: JSON.stringify({
            quiz_id: quiz_id,
          })
        })
        const res = await response.json();
        router.refresh()
  
        if (response.ok) {
          console.log('Quiz delete successfully from deleteCommentApiCall():', res);
        } else {
          console.error('Quiz deleting comment:', await response.json());
        }
    } catch (error) {
    console.error('Quiz deleting comment:', error);
    }
}

export async function editUserApiCall(
  user: User,
  router: AppRouterInstance
) {
  try {
      const response = await fetch("/api/user", {
        method: 'PUT',
        body: JSON.stringify({
          user: user,
        })
      })
      const res = await response.json();
      router.refresh()
      if (response.ok) {
        console.log('User edit successfully from editUserApiCall():', res);
      } else {
        console.error('Error editing User:', await response.json());
      }
  } catch (error) {
  console.error('Error editing User:', error);
  }
}

export async function fetchUsersPlayApiCall(post_id: string) {
  try {
    const response = await fetch(`/api/playdata?post_id=${post_id}`, {
      method: 'GET',
    });

    const res = await response.json();
    if (response.ok) {
      console.log('Successfully from fetchUsersPlayApiCall():', res);
      return res.users_play;
    } else {
      console.error('Error from fetchUsersPlayApiCall:', await response.json());
    }
  } catch (error) {
    console.error(error)
  }
}

export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
}

export function calculateMeanScore(user_play_results: UserPlayResult[]): number {
  if (user_play_results.length == 0) return -1;
  let totalScore = 0;
  let totalMaxScore = 0;

  for (const entry of user_play_results) {
      totalScore += entry.score;
      totalMaxScore += entry.max_score;
  }

  const meanScoreRatio = totalScore / totalMaxScore;

  return Math.round(meanScoreRatio * 100) / 100; // Round to 2 decimal places
}

export function scoreToDifficulty(score: number) {
  if (score < 0) return "Unknown";
  if (score < 0.25) return "Extreme";
  if (score < 0.50) return "Hard";
  if (score < 0.75) return "Medium";
  if (score <= 1) return "Easy";
  return "Unknow";
}