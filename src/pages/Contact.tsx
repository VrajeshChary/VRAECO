import { useState, FormEvent } from 'react';
import { Helmet } from '../components/Helmet';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Use mailto as fallback (no backend needed)
      const subject = encodeURIComponent(`Contact from ${formData.name} — VRAECO Website`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:vraeco.store@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please email us directly at vraeco.store@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact VRAECO Support — vraeco.store@gmail.com | India</title>
        <meta name="description" content="Get in touch with VRAECO customer support. Email: vraeco.store@gmail.com. Fast response guaranteed. Questions about orders, returns, or products?" />
        <meta property="og:title" content="Contact VRAECO Support" />
        <meta property="og:url" content="https://vraeco.com/contact" />
        <link rel="canonical" href="https://vraeco.com/contact" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen">
        <div className="section-inner max-w-[600px]">
          <h1 className="font-serif text-[2.5rem] mb-2 text-center">Contact Us</h1>
          <p className="text-text-muted text-center mb-8">We usually respond within 24 hours</p>

          {submitted ? (
            <div className="bg-surface border border-jade/30 rounded-xl p-8 text-center">
              <CheckCircle size={48} className="text-jade mx-auto mb-4" />
              <h2 className="font-serif text-[1.5rem] mb-2">Message Sent!</h2>
              <p className="text-text-muted mb-4">
                Your email client should have opened with your message. If it didn't, please email us directly at:
              </p>
              <a href="mailto:vraeco.store@gmail.com" className="text-gold font-bold hover:underline">
                vraeco.store@gmail.com
              </a>
            </div>
          ) : (
            <div className="bg-surface border border-edge rounded-xl p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-[0.75rem] font-medium text-text-dim mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-raised border border-edge px-4 py-3 text-text-main outline-none focus:border-gold transition-colors rounded-lg"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[0.75rem] font-medium text-text-dim mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-raised border border-edge px-4 py-3 text-text-main outline-none focus:border-gold transition-colors rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[0.75rem] font-medium text-text-dim mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-raised border border-edge px-4 py-3 text-text-main outline-none focus:border-gold transition-colors rounded-lg resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {error && (
                  <p className="text-ember text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-edge text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail size={16} className="text-gold" />
                  <p className="text-text-muted text-[0.85rem]">Or reach us directly:</p>
                </div>
                <a href="mailto:vraeco.store@gmail.com" className="text-gold font-bold hover:underline">
                  vraeco.store@gmail.com
                </a>
                <div className="mt-3 text-[0.75rem] text-text-dim">
                  We respond within 24 hours during business days
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
