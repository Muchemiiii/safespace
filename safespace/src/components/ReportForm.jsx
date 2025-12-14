import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertTriangle, Send, FileText, Lock } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

const ReportForm = () => {
    const navigate = useNavigate();
    const [isAnonymous, setIsAnonymous] = useState(true); // Always anonymous by default
    const [description, setDescription] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [nickname, setNickname] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim() || !incidentType) {
            alert("Please fill in the incident type and description.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Ensure user is authenticated (anonymously if needed) before writing to Firestore
            if (!auth.currentUser) {
                try {
                    await signInAnonymously(auth);
                } catch (authError) {
                    console.error("Auth Error:", authError);
                    if (authError.code === 'auth/admin-restricted-operation' || authError.code === 'auth/operation-not-allowed') {
                        throw new Error("Anonymous Authentication is disabled. Please enable it in the Firebase Console (Authentication > Sign-in method).");
                    }
                    throw authError;
                }
            }

            await addDoc(collection(db, "Reports"), {
                incidentType,
                description,
                location: 'Not Collected',
                isAnonymous,
                nickname: isAnonymous ? (nickname || 'Anonymous') : (nickname || 'User'), // In real app, link to Auth UID if logged in
                timestamp: serverTimestamp(),
                status: 'success' // Initial status as updated by user request
            });

            // Redirect to logout page immediately after successful save (Safety Exit)
            navigate('/logout');

        } catch (error) {
            console.error("Error adding report: ", error);
            alert(`Failed to submit report: ${error.message}`);
            setIsSubmitting(false); // Only stop submitting if error, otherwise we navigate away
        }
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
                    <select
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                        <option value="" className="bg-blue-900 text-gray-300">Select type of incident...</option>
                        <option value="harassment" className="bg-blue-900">Harassment</option>
                        <option value="unsafe_area" className="bg-blue-900">Unsafe Area Condition</option>
                        <option value="suspicious_activity" className="bg-blue-900">Suspicious Activity</option>

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
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="block w-full px-4 py-3 bg-blue-900/40 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="E.g., Concerned Student (Leave empty to stay anonymous)"
                    />
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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

            {/* Anonymous Toggle Removed - Always Anonymous by default */}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Report (Anonymous)
                    </>
                )}
            </button>
        </form>
    );
};

export default ReportForm;
