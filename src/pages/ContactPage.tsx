import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState<'green' | 'red' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');
    setStatusColor('');

    try {
      const response = await fetch('https://m-erakiartist-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage('✅ Your message has been sent successfully!');
        setStatusColor('green');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatusMessage(`❌ ${data.message || 'Failed to send message.'}`);
        setStatusColor('red');
      }
    } catch (error) {
      setStatusMessage('❌ Something went wrong. Please try again.');
      setStatusColor('red');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us for custom artwork inquiries, quotes, or any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm border border-primary-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-6">Get in Touch</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="What is this regarding?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="textarea-field"
                  rows={5}
                  placeholder="Tell us about your project or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`btn btn-primary w-full flex items-center justify-center ${
                  isSending ? 'cursor-not-allowed opacity-60' : ''
                }`}
              >
                {isSending ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>

              {statusMessage && (
                <p className={`text-center mt-4 text-sm ${statusColor === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary-950 text-white p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-display font-semibold mb-6">Contact Information</h2>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-4 mt-1 text-accent-400" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="mt-1">+91 7598068106</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-4 mt-1 text-accent-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="mt-1">harichselvamc@gmail.com</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 mt-1 text-accent-400" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="mt-1">Tamil Nadu, India</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
              <h2 className="text-2xl font-display font-semibold mb-6">Quick Connect</h2>

              <a
                href="https://wa.me/7598068106"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white rounded-lg p-4 flex items-center hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-medium">Chat with us on WhatsApp</p>
                  <p className="text-sm opacity-90">Usually responds within an hour</p>
                </div>
              </a>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Business Hours</h3>
                <ul className="space-y-2 text-primary-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>11:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
