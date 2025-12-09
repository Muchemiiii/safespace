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

                        {/* Emergency Contact */}
                        <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-xl p-6 border border-red-500/30">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                                Emergency Assembly
                            </h3>
                            <p className="text-red-200 text-sm mb-6">
                                If you are in immediate danger, do not wait. Contact local emergency services immediately.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="tel:112"
                                    className="w-full flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-red-900/20"
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Emergency (112)
                                </a>
                                <a
                                    href="https://www.google.com/maps/search/emergency+services+near+me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center p-4 bg-red-900/50 hover:bg-red-900/70 text-red-100 rounded-lg font-semibold border border-red-500/30 transition-colors"
                                >
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Verify Nearest Station
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Report;
