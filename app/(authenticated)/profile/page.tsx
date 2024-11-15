import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className='container mx-auto py-10'>
      <Card className='bg-white shadow-lg'>
        <CardHeader className='border-b border-gray-200 bg-gray-50'>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6 space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <p className='text-lg font-medium text-gray-900 p-2 bg-gray-50 rounded-md'>
              {session.user.name}
            </p>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <p className='text-lg font-medium text-gray-900 p-2 bg-gray-50 rounded-md'>
              {session.user.email}
            </p>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Account ID
            </label>
            <p className='text-lg font-medium text-gray-900 p-2 bg-gray-50 rounded-md'>
              {session.user.id}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
