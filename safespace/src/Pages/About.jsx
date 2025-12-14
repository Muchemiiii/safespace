import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Heart, Lock, AlertTriangle, Phone, Stethoscope } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-blue-200 sm:text-6xl mb-4">
                        Welcome to Your <span className="text-blue-400">Safe Space</span>
                    </h1>
                    <p className="mt-4 text-xl text-blue-200 max-w-2xl mx-auto">
                        You are not alone. Access immediate help, report incidents securely, or connect with your support network.
                    </p>
                </div>

                {/* Quick Actions Grid - The "Easy Choosing" Dashboard */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    <ActionCard
                        to="/report"
                        icon={<AlertTriangle className="w-8 h-8 text-blue-200" />}
                        title="Report Incident"
                        description="File a secure report about harassment or unsafe conditions."
                        color="bg-gradient-to-br from-red-500 to-rose-600 w-full md:w-[32rem] p-10"
                    />
                    <ActionCard
                        to="/chat"
                        icon={<Users className="w-8 h-8 text-white" />}
                        title="Chat with AI Companion"
                        description="Talk to our supportive AI counselor immediately. Free and private."
                        color="bg-gradient-to-br from-purple-500 to-indigo-600 w-full md:w-[32rem] p-10"
                    />

                </div>

                {/* Values / Reassurance Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">Your Safety is Our Priority</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Lock className="w-6 h-6 text-emerald-400" />}
                            title="100% Private"
                            description="Your actions here are anonymous and encrypted. We never share your data without consent."
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-violet-400" />}
                            title="Community Support"
                            description="Join a network of survivors and professionals dedicated to healing and justice."
                        />
                        <FeatureCard
                            icon={<Heart className="w-6 h-6 text-rose-400" />}
                            title="Healing First"
                            description="We focus on your recovery and well-being, providing tools for every step of the journey."
                        />
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center border-t border-blue-800/50 pt-12">
                    <p className="text-blue-200 mb-6">Need professional counseling?</p>
                    <Link to="/counselor-signup" className="text-white hover:text-blue-300 font-medium underline transition-colors">
                        Register as a Counselor
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ActionCard = ({ to, icon, title, description, color }) => (
    <Link to={to} className={`${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 block group`}>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {icon}
            </div>
            <Shield className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/90 text-lg leading-relaxed">{description}</p>
    </Link>
);

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-700/50 transition-colors">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

export default About;
