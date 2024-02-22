"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { User as UserInterface } from "@/interfaces/UserInterface";

//Find by id = user_2Y1bR9vyshAAdu8GX5RUuUOmqi4 (clerk id)
export async function fetchUser(userId: string) {
  try {
    connectToDB();

    //User.findOne = tìm kiếm user dựa trên id

    return await User.findOne({ id: userId })
  } catch (error: any) {
    console.log(`Failed to fetch user: ${error.message}`);
    return;
  }
}

//Find by _id = 6598d9859ac452e67891352d (mongodb auto create id)
export async function fetchUserById(userId: string) {
  try {
    connectToDB();

    //User.findOne = tìm kiếm user dựa trên id

    return await User.findOne({ _id: userId })
  } catch (error: any) {
    console.log(`Failed to fetch user: ${error.message}`);
    return;
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function editUser(user_id: string, name: string, bio: string): Promise<void> {
  try {
    // Find the User by ID
    const user = await User.findById(user_id).exec();

    if (!user) {
      throw new Error("User not found");
    }

    // Update the User text
    user.name = name;
    user.bio = bio;

    // Save the updated User
    await user.save();

    console.log("User edited successfully");
  } catch (error) {
    console.error("Error while editing User:", error);
    throw new Error("Unable to edit User");
  }
}