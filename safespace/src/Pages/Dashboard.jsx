import React from 'react';
import { Shield, AlertTriangle, Users, MapPin, Bell, Plus, Phone, Activity } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-blue-200">
                            Welcome back, User. Here is your safety overview.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800/50 text-blue-100 rounded-lg shadow-sm border border-blue-700 hover:bg-blue-800 transition-colors">
                            <Bell className="w-4 h-4" />
                            <span>Notifications</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105">
                            <AlertTriangle className="w-4 h-4" />
                            <span>SOS Alert</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Shield className="w-6 h-6 text-white" />}
                        title="Safety Status"
                        value="Secure"
                        trend="+100%"
                        color="bg-indigo-500"
                    />
                    <StatCard
                        icon={<Users className="w-6 h-6 text-white" />}
                        title="Trusted Contacts"
                        value="5 Active"
                        trend="Updated 2h ago"
                        color="bg-emerald-500"
                    />
                    <StatCard
                        icon={<MapPin className="w-6 h-6 text-white" />}
                        title="Safe Zones"
                        value="3 Nearby"
                        trend="1.2km radius"
                        color="bg-violet-500"
                    />
                    <StatCard
                        icon={<Activity className="w-6 h-6 text-white" />}
                        title="System Activity"
                        value="Normal"
                        trend="All systems go"
                        color="bg-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area - Recent Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-blue-900/50 rounded-xl shadow-sm border border-blue-800 p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                                <button className="text-sm text-blue-300 hover:text-white hover:underline">View All</button>
                            </div>
                            <div className="space-y-4">
                                <ActivityItem
                                    icon={<MapPin className="w-5 h-5 text-violet-300" />}
                                    title="Reached Safe Zone: Library"
                                    time="2 hours ago"
                                    description="Location sharing disabled automatically."
                                />
                                <ActivityItem
                                    icon={<Users className="w-5 h-5 text-blue-300" />}
                                    title="Contact Verified: Sarah"
                                    time="Yesterday"
                                    description="Added to Trusted Contacts."
                                />
                                <ActivityItem
                                    icon={<Shield className="w-5 h-5 text-indigo-300" />}
                                    title="Safety Check Completed"
                                    time="2 days ago"
                                    description="Weekly automated system check passed."
                                />
                            </div>
                        </div>

                        {/* Quick Actions Grid for Mobile/Tablet convenience */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ActionCard
                                title="Share Location"
                                desc="Send real-time location to contacts"
                                icon={<MapPin className="w-6 h-6 text-white" />}
                                bgClass="bg-gradient-to-br from-indigo-600 to-blue-700"
                            />
                            <ActionCard
                                title="Report Incident"
                                desc="Flag a safety concern nearby"
                                icon={<AlertTriangle className="w-6 h-6 text-white" />}
                                bgClass="bg-gradient-to-br from-orange-600 to-red-700"
                            />
                        </div>
                    </div>

                    {/* Sidebar - Quick Contacts & Status */}
                    <div className="space-y-6">
                        <div className="bg-blue-900/50 rounded-xl shadow-sm border border-blue-800 p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white">Quick Contacts</h2>
                                <button className="p-1 rounded-full hover:bg-blue-800 transition-colors">
                                    <Plus className="w-5 h-5 text-blue-300" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <ContactItem name="Mom" status="Online" />
                                <ContactItem name="John Doe" status="Last seen 5m ago" />
                                <ContactItem name="Emergency Services" status="Always Active" isEmergency />
                            </div>
                            <button className="w-full mt-4 py-2 border border-blue-700 rounded-lg text-sm text-blue-200 hover:bg-blue-800/50 transition-colors">
                                Manage Contacts
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-violet-700 to-indigo-800 rounded-xl shadow-lg p-6 text-white overflow-hidden relative border border-violet-600/30">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2">Premium Protection</h3>
                                <p className="text-indigo-200 text-sm mb-4">Upgrade to get 24/7 professional monitoring and advanced travel safety features.</p>
                                <button className="w-full py-2 bg-white text-indigo-900 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
                                    View Plans
                                </button>
                            </div>
                            {/* Decorative background element */}
                            <Shield className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500 opacity-20 rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, trend, color }) => (
    <div className="bg-blue-900/50 rounded-xl p-6 shadow-sm border border-blue-800 transition-all hover:bg-blue-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color} shadow-lg shadow-blue-900/20`}>
                {icon}
            </div>
            <span className="text-xs font-medium text-blue-200 bg-blue-950/50 px-2 py-1 rounded-full border border-blue-800">
                {trend}
            </span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-blue-300">{title}</p>
    </div>
);

const ActivityItem = ({ icon, title, time, description }) => (
    <div className="flex items-start space-x-4 p-3 hover:bg-blue-800/30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-700/30">
        <div className="p-2 bg-blue-950/50 rounded-full mt-1 border border-blue-800">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <p className="text-xs text-blue-200 mt-0.5">{description}</p>
            <p className="text-xs text-blue-400 mt-1">{time}</p>
        </div>
    </div>
);

const ContactItem = ({ name, status, isEmergency }) => (
    <div className="flex items-center justify-between p-2 hover:bg-blue-800/30 rounded-lg transition-colors border border-transparent hover:border-blue-700/30">
        <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isEmergency ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-950 text-blue-300 border border-blue-800'}`}>
                {isEmergency ? <AlertTriangle className="w-4 h-4" /> : <div className="font-bold text-xs">{name.charAt(0)}</div>}
            </div>
            <div>
                <p className="text-sm font-medium text-white">{name}</p>
                <p className="text-xs text-blue-300">{status}</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <button className="p-1.5 text-blue-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
            </button>
        </div>
    </div>
);

const ActionCard = ({ title, desc, icon, bgClass }) => (
    <button className={`${bgClass} p-6 rounded-xl shadow-md text-left transition-transform hover:scale-[1.02] active:scale-95 group border border-white/10`}>
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icon}
            </div>
            <ArrowIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-blue-100">{desc}</p>
    </button>
);

const ArrowIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
)

export default Dashboard;
