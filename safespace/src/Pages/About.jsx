import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Heart, Lock, Globe, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Empowering Your <span className="text-blue-400">Safety</span>
                    </h1>
                    <p className="mt-4 text-xl text-blue-200 max-w-3xl mx-auto">
                        SafeSpace is a community-driven platform dedicated to making personal safety accessible, reliable, and intelligent for everyone, everywhere.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 hover:border-blue-700 transition-all">
                        <div className="bg-blue-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-blue-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-blue-100 leading-relaxed">
                            To provide real-time, actionable safety tools that empower individuals to navigate their world with confidence. We believe safety is a fundamental right, not a privilege.
                        </p>
                    </div>
                    <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 hover:border-blue-700 transition-all">
                        <div className="bg-indigo-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6 text-indigo-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                        <p className="text-blue-100 leading-relaxed">
                            A connected global community where technology acts as a guardian, seamlessly integrating into daily life to prevent incidents before they happen and provide immediate aid when they do.
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose SafeSpace?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Lock className="w-6 h-6 text-emerald-400" />}
                            title="Privacy First"
                            description="Your location data is encrypted and shared only when you explicitly choose to. Your privacy is as important as your safety."
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-violet-400" />}
                            title="Community Driven"
                            description="We harness the power of community reporting to identify and flag unsafe zones in real-time."
                        />
                        <FeatureCard
                            icon={<Heart className="w-6 h-6 text-rose-400" />}
                            title="Always There"
                            description="With 24/7 monitoring capabilities and instant SOS alerts, you are never truly alone."
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="border-t border-blue-800/50 pt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StatItem number="10k+" label="Active Users" />
                        <StatItem number="500+" label="Safe Zones" />
                        <StatItem number="24/7" label="Support" />
                        <StatItem number="99%" label="Uptime" />
                    </div>
                </div>

                {/* Team CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center justify-center p-1 rounded-full bg-blue-900/30 border border-blue-800 mb-8">
                        <span className="px-4 py-1 text-sm text-blue-200">Join our journey</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to feel safer?</h2>
                    <Link to="/report" className="px-8 py-3 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all inline-block">
                        Get Started Today
                    </Link>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-700/50 transition-colors">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

const StatItem = ({ number, label }) => (
    <div>
        <div className="text-3xl font-bold text-white mb-1">{number}</div>
        <div className="text-sm text-blue-300 uppercase tracking-wider">{label}</div>
    </div>
);

export default About;
