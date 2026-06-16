import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Smile } from 'lucide-react';

const quickReplies = [
  "What's the delivery time?",
  "Do you offer COD?",
  "How do returns work?",
  "Can I track my order?",
  "Do you ship internationally?",
  "What payment methods do you accept?",
];

const botResponses: Record<string, string> = {
  "What's the delivery time?": "Delivery typically takes 3-5 business days across India. Metro cities usually receive orders within 2-3 days.",
  "Do you offer COD?": "Yes! We offer Cash on Delivery (COD) across all of India. You can pay when your order arrives at your doorstep.",
  "How do returns work?": "We offer 7-day hassle-free returns. If you're not satisfied, just contact our support team and we'll arrange a pickup.",
  "Can I track my order?": "Absolutely! Once your order is shipped, you'll receive a tracking link via SMS and email. You can also use our Order Tracking page.",
  "Do you ship internationally?": "Currently, we only ship within India. We're working on expanding to other countries soon!",
  "What payment methods do you accept?": "We accept UPI, all major credit/debit cards, net banking, wallets (Paytm, PhonePe), and Cash on Delivery (COD).",
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! Welcome to VRAECO. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[text] || "Thanks for your message! Our support team is available Mon-Sat, 10 AM - 7 PM IST. For faster response, email us at vraeco.store@gmail.com";
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-4 md:right-6 z-[9999] w-14 h-14 rounded-full bg-gold text-void flex items-center justify-center shadow-[0_4px_20px_rgba(201,169,76,0.4)] ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-4 md:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[350px] bg-surface border border-edge rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gold text-void px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-void rounded-full flex items-center justify-center text-[0.7rem] font-bold text-gold">V</div>
                <div>
                  <div className="text-[0.8rem] font-bold">VRAECO Support</div>
                  <div className="text-[0.6rem] text-void/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-void rounded-full animate-pulse"></span> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-transparent border-none cursor-pointer text-void/70 hover:text-void">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 max-h-[320px] overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] px-3 py-2 text-[0.78rem] leading-relaxed ${
                    msg.isBot
                      ? 'bg-raised text-text-main rounded-br-2xl rounded-tl-2xl rounded-tr-2xl border border-edge'
                      : 'bg-gold text-void rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-raised border border-edge px-3 py-2 rounded-2xl">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-[0.65rem] bg-surface border border-edge text-text-muted px-2.5 py-1.5 rounded-full hover:border-gold hover:text-gold transition-colors bg-transparent cursor-pointer truncate"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 flex items-center gap-2 border-t border-edge pt-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 bg-raised border border-edge rounded-full px-3 py-2 text-[0.78rem] text-text-main outline-none focus:border-gold transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 bg-gold text-void rounded-full flex items-center justify-center border-none cursor-pointer hover:bg-gold-light transition-colors shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}