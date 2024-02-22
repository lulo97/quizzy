import Favourite from "../models/favourite.model";
import { fetchQuizById } from "./quiz.actions";

export async function isFavouriteExist(post_id: string, author_id: string): Promise<boolean> {
    try {
      return await getFavourite(post_id, author_id)
    } catch (error) {
      console.error('Error checking if favorite exists:', error);
      throw new Error('Unable to check if favorite exists');
    }
  }

export async function getFavourite(post_id: string, author_id: string) {
    return await Favourite.findOne({ post_id: post_id, author_id: author_id }).exec();
}

export async function deleteFavourite(post_id: string, author_id: string): Promise<void> {
    console.log('Start--------------------------------')
    try {

      if (await isFavouriteExist(post_id, author_id)) {
        await Favourite.findOne({ post_id, author_id }).deleteOne().exec();
        console.log('Favorite deleted successfully.');
      } else {
        console.log('Favorite not found.');
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
    console.log('End--------------------------------')
}

export async function createFavourite(post_id: string, author_id: string) {
    try {
        const createdAt = new Date();
        const newFavourite = await Favourite.create({ post_id, author_id, createdAt });
        return newFavourite;
    } catch (error) {
        console.error('Error creating favorite:', error);
        throw new Error('Unable to create favorite');
    }
}

export async function fetchFavouritesByAuthorId(author_id: string) {
    try {
        const favorites = await Favourite.find({ author_id }).exec();

        const favouriteWithPostTitle = await Promise.all(
            favorites.map(async (favorite) => {
                const quiz = await fetchQuizById(favorite.post_id);
                if (quiz) {
                    const post_title = quiz.quiz_info.title
                    return { ...favorite.toObject(), post_title };
                }
            })
        );

        return favouriteWithPostTitle;

    } catch (error) {
        console.error('Error fetching favorites by author ID:', error);
        //throw new Error('Unable to fetch favorites');
    }
}

// Fetch favorites by post ID
export async function fetchFavouritesByPostId(post_id: string) {
    try {
        const favorites = await Favourite.find({ post_id }).exec();
        return favorites;
    } catch (error) {
        console.error('Error fetching favorites by post ID:', error);
        throw new Error('Unable to fetch favorites');
    }
}
  
export async function getTotalFavouriteOfAPost(post_id: string): Promise<number> {
    try {
        const totalFavorites = await Favourite.countDocuments({ post_id }).exec();
        return totalFavorites;
    } catch (error) {
        console.error('Error getting total favorites for a post:', error);
        throw new Error('Unable to get total favorites');
    }
}