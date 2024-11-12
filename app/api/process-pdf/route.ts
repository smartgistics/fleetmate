import { NextResponse } from "next/server"
import pdfParse from "pdf-parse"
import { extractShippingData } from "@/lib/document-processing"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Convert File to Buffer for pdf-parse
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Process PDF
    const data = await pdfParse(buffer)
    
    // Extract shipping information
    const extractedData = extractShippingData(data.text)

    return NextResponse.json({ data: extractedData })
  } catch (error) {
    console.error("PDF processing error:", error)
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    )
  }
} 