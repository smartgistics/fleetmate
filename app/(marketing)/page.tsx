import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          alt="Fleet Management"
          className="object-cover"
          fill
          priority
          src="/hero-images/homepage-hero.jpg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Transportation Management
            </h1>
            <p className="text-xl mb-8">
              Streamline operations, increase efficiency, and drive growth with
              FleetMate TMS
            </p>
            <div className="space-x-4">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8"
              >
                <Link href="/auth/signin">Get Started</Link>
              </Button>
              <Button
                asChild
                className="bg-transparent border-white text-white hover:bg-white/10 text-lg py-6 px-8"
                variant="outline"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Fleet Management
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your fleet operations efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fleet Operations & Finance
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Eliminate duplicate entries and streamline accounting with
                reliable built-in tools that save time and reduce errors.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Process Integration
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Maximize efficiency with integrated tools for expenses,
                communication, maintenance, and more.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Business Growth
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Scale your operations and expand customer base by easily adding
                warehouse and fulfillment services.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fleet Communication
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Customize data sharing and communication to help your team focus
                on what matters most.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intermodal Management
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get company-wide transparency with advanced features like
                chassis tracking through ports and rail.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partner Network
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Quickly source and hire qualified carriers, agents and drivers
                to gain competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about FleetMate TMS
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">A</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    ABC Logistics
                  </h4>
                  <p className="text-gray-600">Transportation Director</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                &quot;FleetMate TMS has revolutionized our operations. The
                real-time tracking and automated dispatching have increased our
                efficiency by 40%.&quot;
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">X</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    XYZ Transport
                  </h4>
                  <p className="text-gray-600">Fleet Manager</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                &quot;The integration capabilities and partner network have
                helped us scale our business across multiple regions
                seamlessly.&quot;
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">G</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    Global Freight Co
                  </h4>
                  <p className="text-gray-600">Operations Manager</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                &quot;The intermodal management features have given us
                unprecedented visibility into our entire supply chain.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600">
              Real impact on your bottom line
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">40%</div>
              <p className="text-xl text-gray-900">Reduction in Manual Tasks</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">25%</div>
              <p className="text-xl text-gray-900">
                Increase in Fleet Utilization
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">60%</div>
              <p className="text-xl text-gray-900">Faster Order Processing</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">30%</div>
              <p className="text-xl text-gray-900">Cost Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Transportation Operations?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join the growing network of successful fleet operators
          </p>
          <Button
            className="bg-white text-blue-600 px-12 py-6 text-xl font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            size="lg"
          >
            Schedule a Demo
          </Button>
        </div>
      </section>
    </div>
  )
}
