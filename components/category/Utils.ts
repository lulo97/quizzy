import { Post } from "@/interfaces/DashboardInterface";

export const CREATE_DATE_STYLE = {
    MENU_ITEMS: "flex flex-col items-start justify-center gap-1 w-full p-1",
    MENU: "absolute z-5 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
}

export const ATTEMPTS_STYLE = {
    MENU_ITEMS: "flex flex-col items-start justify-center gap-1 w-full p-1",
    MENU: "absolute z-5 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
}

export const sortByAttempts = (currentPosts: Post[], order: string) => {
    return currentPosts.sort((a, b) => {
      const attemptsA = a.attempts;
      const attemptsB = b.attempts;
  
      if (order === 'Lowest') {
        return attemptsA - attemptsB;
      } else {
        return attemptsB - attemptsA;
      }
    });
  };

export const sortByCreatedAt = (currentPosts: Post[], order: string) => {
    return currentPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
  
      if (order === 'Oldest') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };