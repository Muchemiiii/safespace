import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Heart,
    Shield,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Stethoscope,
    Users,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: role selection, 2: login form
    const [error, setError] = useState('');

    const roles = [
        {
            id: 'survivor',
            title: 'Survivor',
            description: 'I am seeking support and a safe space to heal',
            icon: <Heart className="w-8 h-8" />,
            color: 'from-pink-500 to-rose-600',
            bgLight: 'bg-pink-50',
            borderColor: 'border-pink-500',
            textColor: 'text-pink-600'
        },
        {
            id: 'counselor',
            title: 'Counselor',
            description: 'I provide professional mental health support',
            icon: <Stethoscope className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-600',
            bgLight: 'bg-blue-50',
            borderColor: 'border-blue-500',
            textColor: 'text-blue-600'
        }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        setError('');
        // Automatically proceed to signin form when role is selected
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
        setError('');
    };

    // Firebase Email/Password Sign In for Counselors
    const handleCounselorSignIn = async (e) => {
        e.preventDefault();
        setError('');

        // Validate email (only letters, no numbers)
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        // Validate password (strong password)
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Counselor signed in:', userCredential.user);
            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Sign in error:', error);
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email. Please register first.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many failed attempts. Please try again later.');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid email or password. Please check and try again.');
                    break;
                default:
                    setError(`Error: ${error.code || error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Email validation - basic format check
    const validateEmail = (emailValue) => {
        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            return 'Please enter a valid email address';
        }
        return null;
    };

    // Password validation - basic length check
    const validatePassword = (passwordValue) => {
        if (passwordValue.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        return null;
    };

    // Anonymous Sign In for Survivors
    const handleSurvivorSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // For survivors, we just save their anonymous username locally
        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem('survivorUsername', email);
            localStorage.setItem('userRole', 'survivor');
            console.log('Survivor entered anonymously:', email);
            // Redirect to dashboard
            navigate('/dashboard');
        }, 1000);
    };

    const handleSubmit = (e) => {
        if (selectedRole === 'counselor') {
            handleCounselorSignIn(e);
        } else {
            handleSurvivorSignIn(e);
        }
    };

    const getSelectedRoleInfo = () => {
        return roles.find(role => role.id === selectedRole);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 pt-20 pb-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center mb-4">
                        <Shield className="w-12 h-12 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SafeSpace</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        {step === 1
                            ? "Select how you'd like to join our community"
                            : "Sign in to continue your journey"
                        }
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'} text-white font-semibold transition-all duration-300`}>
                            {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                        </div>
                        <div className={`w-20 h-1 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'} transition-all duration-300`}></div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'} text-white font-semibold transition-all duration-300`}>
                            2
                        </div>
                    </div>
                </div>

                {/* Step 1: Role Selection */}
                {step === 1 && (
                    <div className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => handleRoleSelect(role.id)}
                                    className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] ${selectedRole === role.id
                                        ? `bg-gradient-to-br ${role.color} shadow-2xl shadow-purple-500/20 ring-4 ring-white/30`
                                        : 'bg-white/10 backdrop-blur-lg hover:bg-white/15 border border-white/20 hover:border-white/40'
                                        }`}
                                >
                                    {selectedRole === role.id && (
                                        <div className="absolute top-4 right-4">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                    )}

                                    <div className={`mb-4 ${selectedRole === role.id ? 'text-white' : role.textColor} transition-colors duration-300`}>
                                        <div className={`inline-flex p-3 rounded-xl ${selectedRole === role.id ? 'bg-white/20' : role.bgLight}`}>
                                            {role.icon}
                                        </div>
                                    </div>

                                    <h3 className={`text-xl font-bold mb-2 ${selectedRole === role.id ? 'text-white' : 'text-white'}`}>
                                        {role.title}
                                    </h3>
                                    <p className={`text-sm ${selectedRole === role.id ? 'text-white/90' : 'text-gray-300'}`}>
                                        {role.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Login Form */}
                {step === 2 && (
                    <div className="animate-fadeIn max-w-md mx-auto">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                            {/* Selected Role Badge */}
                            {getSelectedRoleInfo() && (
                                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getSelectedRoleInfo().color} text-white text-sm font-medium mb-6`}>
                                    {getSelectedRoleInfo().icon && React.cloneElement(getSelectedRoleInfo().icon, { className: 'w-4 h-4' })}
                                    <span>Signing in as {getSelectedRoleInfo().title}</span>
                                </div>
                            )}

                            {/* SURVIVOR - Anonymous Sign In */}
                            {selectedRole === 'survivor' && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-2">Anonymous Sign In</h2>
                                    <p className="text-gray-400 text-sm mb-6">Your privacy is our priority. No email required.</p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Anonymous Username Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Choose a Username
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Users className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="e.g., HopefulSoul123"
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">This can be any name you feel comfortable with</p>
                                        </div>

                                        {/* Optional Password for returning users */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Create a PIN (Optional)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="4-digit PIN"
                                                    maxLength={4}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Create a PIN to return to your account later</p>
                                        </div>

                                        {/* Privacy Notice */}
                                        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30">
                                            <div className="flex items-start space-x-3">
                                                <Shield className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-pink-200 font-medium">Your Privacy Matters</p>
                                                    <p className="text-xs text-pink-300/70 mt-1">We do not collect personal information. Your conversations remain confidential.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/30 flex items-center justify-center space-x-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Entering SafeSpace...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Enter Anonymously</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* COUNSELOR - Email/Password Sign In */}
                            {selectedRole === 'counselor' && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-2">Professional Sign In</h2>
                                    <p className="text-gray-400 text-sm mb-6">Sign in with your verified credentials</p>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-red-200">{error}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                                    placeholder="Enter your professional email"
                                                    required
                                                />
                                            </div>
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
                                                    placeholder="Enter your password"
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
                                        </div>

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-gray-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-white/10"
                                                />
                                                <span className="text-gray-300">Remember me</span>
                                            </label>
                                            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Signing in...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Sign In</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    {/* Sign Up Link */}
                                    <p className="text-center text-gray-400 mt-6">
                                        Need to register as a counselor?{' '}
                                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                            Apply here
                                        </Link>
                                    </p>
                                </>
                            )}

                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                className="w-full mt-6 py-3 text-gray-400 font-medium hover:text-white transition-colors flex items-center justify-center space-x-2"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                                <span>Back to role selection</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span>100% Confidential</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-blue-400" />
                            <span>End-to-End Encrypted</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>Trusted Community</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Signin;
