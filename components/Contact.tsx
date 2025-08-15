import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Send, Zap, Github, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast("Kido spell successfully cast! Your message has been sent to the Soul Society.", {
      description: "I'll respond within 24 hours with my spiritual energy analysis."
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "#",
      description: "Soul Society Repository"
    },
    {
      name: "LinkedIn", 
      icon: Linkedin,
      url: "#",
      description: "Professional Network"
    },
    {
      name: "Twitter",
      icon: Twitter, 
      url: "#",
      description: "Spiritual Updates"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-spiritual">Summon</span> Communication
          </h2>
          <p className="text-xl text-muted-foreground">
            <span className="text-reiatsu">鬼道通信</span> • Kido Spell Contact Form
          </p>
          <div className="w-24 h-1 bg-spiritual-energy mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-card/30 backdrop-blur-sm border-spiritual/30 reiatsu-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-spiritual flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Cast Your Message
              </CardTitle>
              <p className="text-muted-foreground">
                Use this spiritual communication channel to reach me directly.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-spiritual mb-2 block">
                      Soul Reaper Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="bg-input/50 border-spiritual/30 focus:border-spiritual"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-spiritual mb-2 block">
                      Spiritual Frequency
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@soul-society.com"
                      className="bg-input/50 border-spiritual/30 focus:border-spiritual"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm font-medium text-spiritual mb-2 block">
                    Mission Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, collaboration, etc."
                    className="bg-input/50 border-spiritual/30 focus:border-spiritual"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-spiritual mb-2 block">
                    Kido Spell Details
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, collaboration ideas, or any questions you have..."
                    rows={6}
                    className="bg-input/50 border-spiritual/30 focus:border-spiritual resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-spiritual-energy hover:bg-accent text-background font-medium py-3 reiatsu-glow"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                      Casting Spell...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Transmission
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="bg-card/20 backdrop-blur-sm border-spiritual/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-spiritual flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  Direct Spiritual Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                  <Mail className="w-5 h-5 text-spiritual-energy" />
                  <div>
                    <p className="font-medium">Email Communication</p>
                    <p className="text-sm text-muted-foreground">soul.reaper@dev.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-spiritual-energy" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card/20 backdrop-blur-sm border-spiritual/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-spiritual">
                  Soul Society Networks
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Connect with me across different spiritual dimensions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg hover:bg-spiritual-energy/10 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-spiritual-energy/20 rounded-lg flex items-center justify-center group-hover:bg-spiritual-energy/30 transition-colors">
                        <social.icon className="w-5 h-5 text-spiritual-energy" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-spiritual transition-colors">
                          {social.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {social.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Badge */}
            <Card className="bg-card/20 backdrop-blur-sm border-spiritual/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-spiritual-energy rounded-full spiritual-pulse" />
                  <Badge variant="outline" className="border-spiritual text-spiritual">
                    Currently Available
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Open for new projects and collaborations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};