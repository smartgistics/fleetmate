"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
        poster='/hero-images/hero2.jpg'
      >
        <source src='/videos/signout-background.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-60' />

      {/* Content */}
      <Card className='w-full max-w-md shadow-lg border border-gray-200 relative z-10'>
        <CardHeader className='space-y-1 border-b border-gray-200 bg-gray-50/95'>
          <CardTitle className='text-2xl font-bold text-gray-900 text-center'>
            Successfully Signed Out
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 p-6 bg-white/95'>
          <div className='space-y-4'>
            <p className='text-center text-gray-700 text-lg'>
              You have been securely signed out of your account.
            </p>
            <p className='text-center text-gray-600 text-sm'>
              Choose an option below to continue
            </p>
          </div>
          <div className='space-y-3'>
            <Button
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2'
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              Sign in as different user
            </Button>
            <Button
              variant='outline'
              className='w-full bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-gray-900 font-medium'
              onClick={() => (window.location.href = "/")}
            >
              Return to home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
