import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await signOut(auth);
                localStorage.clear(); // Clear local storage (for anonymous users etc)
                // Short delay to show the message
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error("Logout error:", error);
                // Force redirect anyway
                navigate('/');
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl max-w-sm w-full animate-fadeIn">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LogOut className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Signing Out...</h2>
                <p className="text-blue-200">
                    Your session is being securely closed.
                    <br />
                    Redirecting you to safety...
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Logout;
