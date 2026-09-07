import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900">We&apos;d Love to Hear From You</h1>
        <p className="text-sm text-gray-500 mt-2">
          Have a question about sizing, styling, or your recent order? Our dedicated styling concierges are available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Email Us</h4>
              <p className="text-xs text-gray-500 mt-0.5">care@chicwove.com</p>
              <p className="text-[11px] text-gray-400 mt-1">Average reply under 2 hours</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Call Concierge</h4>
              <p className="text-xs text-gray-500 mt-0.5">+1 (800) 555-CHIC</p>
              <p className="text-[11px] text-gray-400 mt-1">Mon - Sun, 8am - 9pm EST</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Flagship Studio</h4>
              <p className="text-xs text-gray-500 mt-0.5">450 Fashion Ave, Suite 1200</p>
              <p className="text-[11px] text-gray-400 mt-1">New York, NY 10018</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Message Received</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Thank you, {form.name || 'friend'}! We have received your inquiry and our styling team will reply to <b>{form.email}</b> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Order query, styling advice, or feedback"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-[#E85042] hover:bg-[#D43D30] text-white text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
