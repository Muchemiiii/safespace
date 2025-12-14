import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Shield, AlertCircle } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello. I'm your SafeSpace Companion. I'm here to listen and support you. How are you feeling today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulated AI Logic (Rule-based)
    const generateResponse = (text) => {
        const lowerText = text.toLowerCase();

        // Crisis check
        if (lowerText.includes('suicide') || lowerText.includes('kill myself') || lowerText.includes('die') || lowerText.includes('hurt myself')) {
            return "I hear that you're in a lot of pain, and I want you to be safe. Please, if you are in immediate danger, call emergency services (911) or the Suicide & Crisis Lifeline (988) right away. You are not alone.";
        }

        // Keywords and responses
        if (lowerText.includes('sad') || lowerText.includes('depress') || lowerText.includes('unhappy')) {
            return "I'm sorry to hear that you're feeling down. It's okay to feel this way. Would you like to talk more about what's making you feel sad?";
        }
        if (lowerText.includes('anxious') || lowerText.includes('worry') || lowerText.includes('fear') || lowerText.includes('panic')) {
            return "Anxiety can be really overwhelming. Try to take a slow, deep breath with me. Breathe in... and breathe out. What is on your mind right now?";
        }
        if (lowerText.includes('lonely') || lowerText.includes('alone')) {
            return "Loneliness is a heavy feeling. But please remember, you are connected to us here at SafeSpace. I'm here with you. What would make you feel a little less alone right now?";
        }
        if (lowerText.includes('thank')) {
            return "You're very welcome. I'm glad I could be here for you.";
        }
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            return "Hello there. How can I support you today?";
        }

        // Default supportive responses
        const defaultResponses = [
            "I'm listening. Please go on.",
            "That sounds difficult. How have you been coping with this?",
            "Thank you for sharing that with me. It takes courage to open up.",
            "I hear you. Tell me more about that.",
            "Your feelings are valid. I'm here for you."
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate network delay for natural feel
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: generateResponse(userMessage.text),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-20 pb-12 flex flex-col">
            <div className="max-w-4xl mx-auto w-full px-4 flex-grow flex flex-col">

                {/* Header */}
                <div className="bg-white rounded-t-2xl shadow-sm p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Bot className="w-7 h-7 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">SafeSpace Companion</h1>
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-gray-500">Online • AI Counselor</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-400 max-w-[200px]">
                            This is an automated AI support tool. For emergencies, please call 911.
                        </p>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-grow bg-white shadow-xl overflow-hidden flex flex-col relative min-h-[500px]">
                    <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                                        }`}>
                                        {msg.sender === 'user' ? (
                                            <User className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <Bot className="w-5 h-5 text-purple-600" />
                                        )}
                                    </div>
                                    <div
                                        className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                        <p className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                                            }`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex space-x-3 max-w-[80%]">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSendMessage} className="flex space-x-4">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message here..."
                                className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Disclaimer Footer */}
                <div className="mt-4 flex items-start space-x-2 p-4 bg-blue-50 text-blue-800 rounded-xl text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                        SafeSpace Companion uses an automated system to provide support. It does not replace professional therapy.
                        If you are in immediate danger, please call emergency services.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
