import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MessageCircle,
  Calendar,
  Shield,
  ArrowRight,
  Star,
  ChevronRight,
  Heart
} from 'lucide-react';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Support Community",
      description: "Connect with others who understand what you're going through in a safe, moderated environment.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Anonymous Chat",
      description: "Share your thoughts and feelings anonymously with trained listeners and peers.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Therapist Matching",
      description: "Find licensed therapists who specialize in your specific needs and preferences.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Environment",
      description: "Our platform is strictly moderated to ensure a respectful and secure space for everyone.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Community Member",
      content: "SafeSpace helped me find people who truly understand. I've never felt so supported.",
      rating: 5
    },
    {
      name: "James L.",
      role: "Therapist",
      content: "A wonderful platform that makes mental health support accessible to everyone.",
      rating: 5
    },
    {
      name: "Alex K.",
      role: "Community Member",
      content: "The anonymous feature gave me the courage to open up about my struggles.",
      rating: 4
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Safe Space for
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Mental Health</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with a supportive community, access professional help, and find the resources you need
              in a safe, anonymous environment designed for your mental wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signin" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-green-600">200+</div>
              <div className="text-gray-600">Licensed Therapists</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How SafeSpace Helps You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides multiple ways to support your mental health journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform hover:scale-105 transition duration-300 cursor-pointer shadow-lg`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="mb-4 bg-white/20 p-3 rounded-xl w-fit backdrop-blur-sm">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Real stories from people who found support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of others who have found support and community at SafeSpace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signin" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
              Join us Today
            </Link>
            <Link to="/chat" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition duration-300 backdrop-blur-sm flex items-center justify-center">
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;