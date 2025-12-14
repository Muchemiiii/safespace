import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
    Shield,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Stethoscope,
    User,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const CounselorSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Email validation - only letters allowed (no numbers)
    const validateEmail = (emailValue) => {
        const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*@[a-zA-Z]+\.[a-zA-Z]+$/;
        if (!emailRegex.test(emailValue)) {
            return 'Email must contain only letters (no numbers). Example: john.doe@gmail.com';
        }
        return null;
    };

    // Password validation - must be strong
    const validatePassword = (passwordValue) => {
        if (passwordValue.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(passwordValue)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(passwordValue)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            return 'Password must contain at least one special character (!@#$%^&*...)';
        }
        return null;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Validate name
        if (!name.trim()) {
            setError('Please enter your full name');
            return;
        }

        // Validate email
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        // Check passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update display name
            await updateProfile(user, {
                displayName: name
            });

            // 3. Save user data to Firestore
            await setDoc(doc(db, "Users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                role: "counselor",
                createdAt: new Date(),
            });

            console.log("Counselor registered:", user);
            setSuccess(true);

            // 4. Redirect after success
            setTimeout(() => {
                navigate("/about");
            }, 2000);

        } catch (error) {
            console.error("Signup error:", error);

            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("An account with this email already exists.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak.");
                    break;
                case "auth/operation-not-allowed":
                    setError("Email/Password login is not enabled in Firebase Console.");
                    break;
                default:
                    setError(`Failed to create account: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 pt-20 pb-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Counselor Registration
                    </h1>
                    <p className="text-gray-400">
                        Create your professional account
                    </p>
                </div>

                {/* Success Message */}
                {success ? (
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                        <p className="text-gray-300 mb-4">Redirecting you to sign in...</p>
                    </div>
                ) : (
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-5">
                            {/* Full Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="john.doe@example.com"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Letters only, no numbers</p>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">8+ chars, uppercase, lowercase, special char</p>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                <div className="flex items-start space-x-3">
                                    <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-blue-200">
                                        By registering, you agree to maintain professional conduct and patient confidentiality as per SafeSpace guidelines.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span>Verified Professionals</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-blue-400" />
                            <span>Secure Platform</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounselorSignup;
