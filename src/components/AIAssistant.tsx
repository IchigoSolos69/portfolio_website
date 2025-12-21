
import React, { useState, useRef, useEffect } from 'react';
import { assistant } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PORTFOLIO_DATA } from '../constants';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  // Use correct name from PORTFOLIO_DATA for the initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Welcome. I am ${PORTFOLIO_DATA.name}'s digital interface. How can I assist you in exploring their legacy today?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await assistant.sendMessage(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "A signal disruption has occurred. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isOpen ? 'bg-[#EBD5AB] text-[#1B211A]' : 'bg-[#628141] text-[#EBD5AB] shadow-[#628141]/30'}`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-[100] w-[90vw] max-w-[380px] h-[550px] glass rounded-[32px] shadow-3xl border-[#EBD5AB]/10 flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EBD5AB]/5 bg-[#628141]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8BAE66] animate-pulse"></div>
                <h3 className="font-heading font-bold text-[#EBD5AB] tracking-tight">AI Concierge</h3>
              </div>
              <p className="text-[10px] text-[#8BAE66] uppercase tracking-[0.3em] font-bold mt-1">Status: Operational</p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#628141] text-[#EBD5AB]' : 'bg-[#EBD5AB]/5 border border-[#EBD5AB]/10 text-[#EBD5AB]/80'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#EBD5AB]/5 px-5 py-3 rounded-2xl border border-[#EBD5AB]/10">
                    <div className="flex gap-1.5">
                      <div className="w-1 h-1 bg-[#8BAE66] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-[#8BAE66] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-[#8BAE66] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-[#EBD5AB]/5">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire here..."
                  className="w-full py-4 px-6 pr-14 rounded-2xl bg-[#1B211A] border border-[#EBD5AB]/10 focus:border-[#8BAE66] outline-none text-sm text-[#EBD5AB] transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#628141] text-[#EBD5AB] hover:bg-[#8BAE66] hover:text-[#1B211A] disabled:opacity-30 transition-all duration-500"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
