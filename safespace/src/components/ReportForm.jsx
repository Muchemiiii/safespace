import React, { useState } from 'react';
import { MapPin, Camera, AlertTriangle, Send, FileText, Lock } from 'lucide-react';

const ReportForm = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [location, setLocation] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleGetLocation = () => {
        setLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Using OpenStreetMap Nominatim for Reverse Geocoding (Free, no key required for demo)
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();

                        // Construct a readable location string
                        const address = data.address;
                        const county = address.county || address.state || address.region || '';
                        const city = address.city || address.town || address.village || '';
                        const road = address.road || '';
                        const formattedLocation = `${road}, ${city}, ${county} (Maps: https://maps.google.com/?q=${latitude},${longitude})`;

                        setLocation(formattedLocation.replace(/^, /, ''));
                    } catch (error) {
                        console.error("Geocoding error:", error);
                        // Fallback to coordinates if geocoding fails
                        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                        setLocation(mapsUrl);
                    }

                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to retrieve location. Please check browser permissions.");
                    setLoadingLocation(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoadingLocation(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Report submitted successfully! (This is a demo)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Incident Type */}
            <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                    Incident Type
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AlertTriangle className="h-5 w-5 text-blue-400" />
                    </div>
                    <select className="block w-full pl-10 pr-3 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                        <option value="" className="bg-blue-900 text-gray-300">Select type of incident...</option>
                        <option value="harassment" className="bg-blue-900">Harassment</option>
                        <option value="unsafe_area" className="bg-blue-900">Unsafe Area Condition</option>
                        <option value="suspicious_activity" className="bg-blue-900">Suspicious Activity</option>
                        <option value="emergency" className="bg-blue-900">Emergency (Please call 911)</option>
                        <option value="other" className="bg-blue-900">Other</option>
                    </select>
                </div>
            </div>

            {/* Nickname (Optional) - For users who don't want to use real name */}
            <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                    Nickname / Pseudonym (Optional)
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="block w-full px-4 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="E.g., Concerned Student (Leave empty to stay anonymous)"
                    />
                </div>
            </div>

            {/* Location */}
            <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                    Location
                </label>
                <div className="flex space-x-2">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter address or describe location"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={loadingLocation}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <MapPin className="w-4 h-4 mr-2" />
                        {loadingLocation ? "Locating..." : "Use My Location"}
                    </button>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                    Description
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <textarea
                        rows="4"
                        className="block w-full pl-10 pr-3 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Please describe what happened..."
                    ></textarea>
                </div>
            </div>

            {/* Evidence Upload */}
            <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                    Evidence (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-800 border-dashed rounded-lg hover:bg-blue-900/30 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                        <Camera className="mx-auto h-12 w-12 text-blue-400" />
                        <div className="flex text-sm text-blue-300">
                            <span className="relative cursor-pointer rounded-md font-medium text-blue-200 hover:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-blue-400">
                            PNG, JPG, MP4 up to 10MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center">
                <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isAnonymous ? 'bg-emerald-500' : 'bg-blue-800'}`}
                    onClick={() => setIsAnonymous(!isAnonymous)}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`}
                    ></span>
                </button>
                <div className="ml-3 flex items-center">
                    <Lock className={`w-4 h-4 mr-2 ${isAnonymous ? 'text-emerald-400' : 'text-blue-400'}`} />
                    <span className="text-sm font-medium text-blue-200">
                        {isAnonymous ? "Submitting Anonymously" : "Submit with my profile"}
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.01]"
            >
                <Send className="w-5 h-5 mr-2" />
                Submit Report
            </button>
        </form>
    );
};

export default ReportForm;
