import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function createPlayDataApiCall(
    user_id: string,
    post_id: string,
    time_taken: number,
    answers_string: string,
    router: AppRouterInstance
) {
    try {
        const response = await fetch("/api/playdata", {
          method: 'POST',
          body: JSON.stringify({
            user_id: user_id,
            post_id: post_id,
            time_taken: time_taken,
            answers_string: answers_string
          })
        })
        
        console.log("response: ", response)
        const res = await response.json();
        router.refresh()

        if (response.ok) {
          console.log('PlayData handle created successfully: ', res);
        } else {
          console.error('Error creating PlayData:', await response.json());
        }
    } catch (error) {
    console.error('Error creating PlayData:', error);
    }
}