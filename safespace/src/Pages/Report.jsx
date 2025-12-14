import React from 'react';
import ReportForm from '../components/ReportForm';
import { Shield, Phone, Info, LifeBuoy, AlertTriangle, MapPin } from 'lucide-react';

const Report = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-900/50 rounded-full mb-4 border border-blue-800 shadow-lg shadow-blue-900/20">
                        <Shield className="w-8 h-8 text-blue-300" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                        Report an Incident
                    </h1>
                    <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
                        Your safety is our priority. Use this secure form to report concerns, harassment, or unsafe conditions.
                        We review every report diligently.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 shadow-xl">
                            <ReportForm />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        {/* Guidelines Card */}
                        <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
                            <h3 className="flex items-center text-lg font-semibold text-white mb-4">
                                <Info className="w-5 h-5 mr-2 text-indigo-400" />
                                Reporting Guidelines
                            </h3>
                            <ul className="space-y-3 text-sm text-blue-200">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Be as specific as possible about the location and time.
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Upload photos or videos if you have them safely available.
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Use "Anonymous" mode if you do not wish to be contacted.
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default Report;
