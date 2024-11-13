"use client";

import { useState } from "react";
import { Upload, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { FormData } from "@/types/truckmate";
import { toast } from "@/components/ui/use-toast";

interface InitialScreenProps {
  onSelectManual: () => void;
  onSelectUpload: () => void;
  onFileProcessed: (data: Partial<FormData>) => void;
}

export function InitialScreen({
  onSelectManual,
  onSelectUpload,
  onFileProcessed,
}: InitialScreenProps) {
  const [showUploader, setShowUploader] = useState(false);

  const handleUploadClick = () => {
    setShowUploader(true);
  };

  const handleFileProcessed = (data: Partial<FormData>) => {
    onFileProcessed(data);
    onSelectUpload();
  };

  const handleError = (error: string) => {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <div className='space-y-6 p-6'>
      {!showUploader ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card
            className='relative overflow-hidden transition-all hover:shadow-lg cursor-pointer'
            onClick={onSelectManual}
          >
            <CardHeader className='space-y-1'>
              <div className='flex items-center space-x-2'>
                <ClipboardList className='h-5 w-5 text-muted-foreground' />
                <CardTitle>Manual Entry</CardTitle>
              </div>
              <CardDescription>
                Create a new shipment by filling out the form step by step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant='default' className='w-full'>
                Start Manual Entry
              </Button>
            </CardContent>
          </Card>

          <Card
            className='relative overflow-hidden transition-all hover:shadow-lg cursor-pointer'
            onClick={handleUploadClick}
          >
            <CardHeader className='space-y-1'>
              <div className='flex items-center space-x-2'>
                <Upload className='h-5 w-5 text-muted-foreground' />
                <CardTitle>Upload Document</CardTitle>
              </div>
              <CardDescription>
                Import shipment details from a document or image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant='default' className='w-full'>
                Choose File
              </Button>
              <p className='text-xs text-muted-foreground mt-2 text-center'>
                Supports PDF, JPG, PNG (max 10MB)
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className='space-y-4'>
          <Button
            variant='ghost'
            className='mb-4'
            onClick={() => setShowUploader(false)}
          >
            ← Back to options
          </Button>
          <FileUploader
            onFileProcessed={handleFileProcessed}
            onError={handleError}
          />
        </div>
      )}
    </div>
  );
}
