import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Comment } from '@/interfaces/QuizInterface';

export async function createFavouriteApiCall(
    parent_id: string, 
    author_id: string, 
    router: AppRouterInstance
) {
    try {
        const response = await fetch("/api/favourite", {
          method: 'POST',
          body: JSON.stringify({
            parent_id: parent_id,
            author_id: author_id,
          })
        })

        const res = await response.json();
        router.refresh()

        if (response.ok) {
          console.log('Favourite handle created successfully: ', res);
        } else {
          console.error('Error creating favourite:', await response.json());
        }
    } catch (error) {
    console.error('Error creating favourite:', error);
    }
}

export async function deleteFavouriteApiCall(
    parent_id: string,
    author_id: string,
    router: AppRouterInstance
  ) {
    try {
      const response = await fetch('/api/favourite', {
        method: 'DELETE',
        body: JSON.stringify({
          parent_id: parent_id,
          author_id: author_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const res = await response.json();
      router.refresh();

      if (response.ok) {
        console.log('Favorite deleted successfully: ', res);
      } else {
        console.error('Respond not ok:', await response.json());
      }
  
    } catch (error) {
      console.error('Error deleting favorite, catch:', error);
    }
  }

export async function createCommentApiCall(
    post_id: string, 
    author_id: string, 
    commentText: string,
    router: AppRouterInstance
) {
    try {
        const response = await fetch("/api/comments", {
          method: 'POST',
          body: JSON.stringify({
            post_id: post_id,
            author_id: author_id,
            text: commentText
          })
        })
        const res = await response.json();
        router.refresh()

        if (response.ok) {
          console.log('Comment created successfully');
        } else {
          console.error('Error creating comment:', await response.json());
        }
    } catch (error) {
    console.error('Error creating comment:', error);
    }
}

export async function deleteCommentApiCall(
  comment_id: string,
  router: AppRouterInstance
) {
  try {
      const response = await fetch("/api/comments", {
        method: 'DELETE',
        body: JSON.stringify({
          comment_id: comment_id,
        })
      })
      const res = await response.json();
      router.refresh()

      if (response.ok) {
        console.log('Comment delete successfully from deleteCommentApiCall():', res);
      } else {
        console.error('Error deleting comment:', await response.json());
      }
  } catch (error) {
  console.error('Error deleting comment:', error);
  }
}

export async function editCommentApiCall(
  comment: Comment,
  router: AppRouterInstance
) {
  try {
      const response = await fetch("/api/comments", {
        method: 'PUT',
        body: JSON.stringify({
          comment: comment,
        })
      })
      const res = await response.json();
      router.refresh()
      if (response.ok) {
        console.log('Comment edit successfully from editCommentApiCall():', res);
      } else {
        console.error('Error editing comment:', await response.json());
      }
  } catch (error) {
  console.error('Error editing comment:', error);
  }
}