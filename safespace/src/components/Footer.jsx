import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Twitter, Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-blue-900/50 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center space-x-3 mb-6">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">SafeSpace</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Empowering individuals with real-time safety tools and a supportive community. Together, we build a safer world for everyone.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
                        <ul className="space-y-4 text-sm">
                            <li><FooterLink to="/" text="Home" /></li>
                            <li><FooterLink to="/about" text="About Us" /></li>
                            <li><FooterLink to="/features" text="Features" /></li>
                            <li><FooterLink to="/report" text="Report Incident" /></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li><FooterLink to="#" text="Safety Resources" /></li>
                            <li><FooterLink to="#" text="Community Guidelines" /></li>
                            <li><FooterLink to="#" text="Privacy Policy" /></li>
                            <li><FooterLink to="#" text="Emergency Contacts" /></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                                <span>support@safespace.com</span>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                                <span>+1 (800) SAFE-HELP</span>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-800 text-blue-200 mt-6">
                                <p className="font-semibold text-white mb-1">Emergency?</p>
                                <p className="text-xs">If you are in immediate danger, please dial 112 or local emergency services.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2025 SafeSpace™. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, text }) => (
    <Link to={to} className="hover:text-blue-400 transition-colors block">
        {text}
    </Link>
);

const SocialIcon = ({ icon, href }) => (
    <a
        href={href}
        className="text-slate-400 hover:text-white bg-slate-900 p-2 rounded-full hover:bg-blue-600 transition-all duration-300"
    >
        {icon}
    </a>
);

export default Footer;
