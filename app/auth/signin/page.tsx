'use client'

import { signIn } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/Button'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        poster="/hero-images/signin-hero.jpg"
        preload="auto"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      >
        <source src="/videos/signin-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <Card className="w-full max-w-md shadow-lg border border-gray-200 relative z-10">
        <CardHeader className="space-y-1 border-b border-gray-200 bg-gray-50/95 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to FleetMate TMS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6 bg-white/95">
          {/* Marketing Messages */}
          <div className="space-y-4">
            <p className="text-center text-gray-700 text-lg font-medium">
              Your Complete Transportation Management Solution
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-700">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <p>Real-time shipment tracking</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <p>Efficient dispatch management</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <p>Comprehensive reporting tools</p>
              </div>
            </div>
          </div>

          {/* Sign In Section */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-gray-700">
                Sign in with your Corporate Traffic account
              </p>
              <p className="text-sm text-gray-500">
                Use your Microsoft work account to access the platform
              </p>
            </div>

            <Button
              className="w-full bg-[#2F2F2F] hover:bg-[#1F1F1F] text-white font-medium py-2 flex items-center justify-center space-x-2"
              onClick={() => signIn('azure-ad', { callbackUrl: '/dashboard' })}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0l11.4-11.4L0 1.2h11.4L22.8 12 11.4 24z" />
              </svg>
              <span>Sign in with Microsoft</span>
            </Button>

            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
