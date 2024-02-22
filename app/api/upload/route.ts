import { NextRequest, NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const utapi = new UTApi()
  const response_utapi = await utapi.uploadFiles(file);

  return NextResponse.json({ success: true, response_utapi: response_utapi });
}

