"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Authentication Error</h1>
        <p className='text-red-500'>
          {error === "AccessDenied"
            ? "You do not have permission to access this application."
            : "An error occurred during authentication."}
        </p>
      </div>
    </div>
  );
}
