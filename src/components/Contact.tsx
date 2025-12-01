import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                  <FiMail className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="text-gray-600">adimaitre@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                  <FiPhone className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                  <FiMapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Location</h4>
                  <p className="text-gray-600">Mumbai, India</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-bold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <FiMail className="w-5 h-5" />
                </a>
                <a href="#" className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <FiMail className="w-5 h-5" />
                </a>
                <a href="#" className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <FiMail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
