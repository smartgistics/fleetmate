import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FleetMate TMS",
  description: "Transportation Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-100`}>
        <SidebarProvider>
          <div className='min-h-screen flex'>
            <Sidebar />

            {/* Main content */}
            <div className='flex-1 flex flex-col'>
              <header className='bg-white shadow'>
                <div className='px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg
                      className='h-8 w-8 text-blue-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                      />
                    </svg>
                    <h1 className='text-2xl font-semibold text-gray-900'>
                      FleetMate TMS
                    </h1>
                  </div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <GlobalSearch />
                  </Suspense>
                </div>
              </header>

              <div className='flex-1 overflow-auto'>{children}</div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
