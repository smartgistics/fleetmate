import { NextResponse } from "next/server";
import { extractShippingData } from "@/lib/document-processing";

// Dynamic import to prevent build-time execution
const getPdfParse = () => import("pdf-parse").then((mod) => mod.default);

export async function POST(request: Request) {
  try {
    // Check if the request is JSON (from OCR) or FormData (from PDF upload)
    const contentType = request.headers.get("content-type");
    let text: string;

    if (contentType?.includes("application/json")) {
      const { text: ocrText } = await request.json();
      text = ocrText;
    } else {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "No valid file provided" },
          { status: 400 }
        );
      }

      // Convert File to Buffer for pdf-parse
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Dynamically import and use pdf-parse
      const pdfParse = await getPdfParse();
      const pdfData = await pdfParse(buffer, {
        // Disable test file loading
        max: 0,
        version: "default",
      });

      text = pdfData.text;
    }

    // Extract shipping information
    const extractedData = extractShippingData(text);

    return NextResponse.json({ data: extractedData });
  } catch (error) {
    console.error("PDF/Text processing error:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
