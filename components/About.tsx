import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Swords, Zap, Shield, Star } from 'lucide-react';

export const About = () => {
  const ranks = [
    { icon: Swords, label: "Captain", description: "Frontend Development" },
    { icon: Zap, label: "Vice-Captain", description: "Backend Systems" },
    { icon: Shield, label: "Seated Officer", description: "UI/UX Design" },
    { icon: Star, label: "Elite", description: "Full-Stack Architecture" }
  ];

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-spiritual">Soul Reaper</span> Profile
          </h2>
          <p className="text-xl text-muted-foreground">
            <span className="text-reiatsu">隊長</span> • Developer Division
          </p>
          <div className="w-24 h-1 bg-spiritual-energy mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-spiritual/30 reiatsu-glow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-spiritual-energy rounded-full spiritual-pulse" />
                <h3 className="text-2xl font-bold text-spiritual">Personal Data</h3>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Name:</span>
                  <span className="text-foreground">Soul Reaper Dev</span>
                </div>
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Division:</span>
                  <span className="text-spiritual">Web Development Squad</span>
                </div>
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Zanpakuto:</span>
                  <span className="text-reiatsu">Code Reaper</span>
                </div>
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Spiritual Pressure:</span>
                  <span className="text-accent">Captain Level</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">
                  A skilled developer from the modern world who discovered the power to bridge 
                  the gap between the spirit world and digital realm. Specializes in creating 
                  powerful web applications with the precision of a Soul Reaper's blade.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ranks & Abilities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="text-spiritual">Gotei 13</span> Specializations
            </h3>
            
            <div className="grid gap-4">
              {ranks.map((rank, index) => (
                <Card 
                  key={rank.label}
                  className="bg-card/30 backdrop-blur-sm border-spiritual/20 hover:border-spiritual/50 transition-all duration-300 hover:reiatsu-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-spiritual-energy/20 rounded-lg flex items-center justify-center">
                      <rank.icon className="w-6 h-6 text-spiritual-energy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-spiritual">{rank.label}</h4>
                        <Badge variant="outline" className="border-spiritual text-spiritual text-xs">
                          Active
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{rank.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Spiritual Stats */}
            <Card className="bg-card/30 backdrop-blur-sm border-spiritual/30 mt-8">
              <CardContent className="p-6">
                <h4 className="font-bold text-spiritual mb-4">Spiritual Power Levels</h4>
                <div className="space-y-3">
                  {[
                    { skill: "Kido (Frontend)", level: 90 },
                    { skill: "Zanjutsu (Backend)", level: 85 },
                    { skill: "Hakuda (DevOps)", level: 80 },
                    { skill: "Hoho (Performance)", level: 95 }
                  ].map((stat) => (
                    <div key={stat.skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{stat.skill}</span>
                        <span className="text-sm text-spiritual">{stat.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full gradient-spiritual transition-all duration-1000"
                          style={{ width: `${stat.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};