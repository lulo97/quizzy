import { NextResponse } from "next/server";
import { createFavourite, deleteFavourite } from "@/lib/actions/favourite.actions";

interface Favourite {
    parent_id: string,
    author_id: string,
    text: string
}

export async function POST(request: Request) {
    const body: Favourite = await request.json()
    const {parent_id, author_id} = body

    const favourite = await createFavourite(parent_id, author_id)

    return NextResponse.json({"msg": "Message from api post", "favourite": favourite})
}

export async function DELETE(request: Request) {
      const body: Favourite = await request.json();
      const { parent_id, author_id } = body;
  
      const result = await deleteFavourite(parent_id, author_id);
  
      return NextResponse.json({"msg": "Message from api delete", "result": result});
}