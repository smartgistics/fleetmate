"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File as FileIcon, X } from "lucide-react";
import { createWorker } from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import type { FormData } from "@/types";
import { mapExcelToFormData } from "@/lib/document-processing";

interface FileUploaderProps {
  onFileProcessed: (data: Partial<FormData>) => void;
  onError: (error: string) => void;
}

export function FileUploader({ onFileProcessed, onError }: FileUploaderProps) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const processFile = async (file: File) => {
    setProcessing(true);
    setProgress(0);

    try {
      if (file.type.includes("image")) {
        await processImage(file);
      } else if (file.type.includes("pdf")) {
        await processPDF(file);
      } else if (
        file.type.includes("spreadsheet") ||
        file.name.endsWith(".xlsx")
      ) {
        await processExcel(file);
      }
    } catch (error) {
      onError("Error processing file: " + (error as Error).message);
    } finally {
      setProcessing(false);
      setProgress(100);
    }
  };

  const processImage = async (file: File) => {
    const worker = await createWorker();

    try {
      await worker.load();
      await worker.setParameters({
        lang: "eng",
      });

      const { data } = await worker.recognize(file);

      // Use the API to process the extracted text
      const response = await fetch("/api/process-pdf", {
        method: "POST",
        body: JSON.stringify({ text: data.text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to process image text");
      }

      const responseData = await response.json();
      onFileProcessed(responseData.data);
    } finally {
      await worker.terminate();
    }
  };

  const processPDF = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/process-pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process PDF");
    }

    const { data } = await response.json();
    onFileProcessed(data);
  };

  const processExcel = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const XLSX = (await import("xlsx")).default;
    const workbook = XLSX.read(arrayBuffer);

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    const extractedData = mapExcelToFormData(
      jsonData[0] as Record<string, unknown>
    );
    onFileProcessed(extractedData);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        void processFile(file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
  });

  return (
    <div className='w-full space-y-4'>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300"}
          ${processing ? "pointer-events-none opacity-50" : ""}
        `}
      >
        <input {...getInputProps()} />
        {processing ? (
          <div className='flex flex-col items-center'>
            <Spinner className='h-12 w-12 text-gray-400' />
            <p className='mt-2 text-sm text-gray-600'>Processing file...</p>
          </div>
        ) : (
          <>
            <Upload className='mx-auto h-12 w-12 text-gray-400' />
            <p className='mt-2 text-sm text-gray-600'>
              {isDragActive
                ? "Drop the file here..."
                : "Drag and drop a file here, or click to select"}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              Supports PDF, XLSX, PNG, JPG (max 10MB)
            </p>
          </>
        )}
      </div>

      {selectedFile && (
        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <FileIcon className='h-5 w-5 text-gray-500' />
            <span className='text-sm text-gray-700'>{selectedFile.name}</span>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setSelectedFile(null)}
            disabled={processing}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}

      {processing && (
        <div className='space-y-2'>
          <Progress value={progress} className='w-full' />
          <p className='text-sm text-center text-gray-600'>
            Processing file... {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
