
import React, { useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Zap, Shield, Target } from 'lucide-react';

const CustomAngleTick = (props: any) => {
  const { x, y, payload, cx, cy } = props;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / dist;
  const ny = dy / dist;
  const displacement = 25; 
  const tx = x + nx * displacement;
  const ty = y + ny * displacement;
  const textAnchor = nx > 0.1 ? 'start' : nx < -0.1 ? 'end' : 'middle';
  const verticalAnchor = ny > 0.5 ? 'hanging' : ny < -0.5 ? 'auto' : 'middle';

  return (
    <g transform={`translate(${tx},${ty})`}>
      <text
        x={0}
        y={0}
        textAnchor={textAnchor}
        dominantBaseline={verticalAnchor}
        fill="#EBD5AB"
        fontSize="10px"
        fontWeight="800"
        className="uppercase tracking-[0.15em] font-heading"
        style={{ 
          filter: 'drop-shadow(0px 0px 3px rgba(139, 174, 102, 0.4))',
          opacity: 0.9
        }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const shard1Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const shard2Y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const shard3Y = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const shardRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-[#1B211A] relative overflow-hidden">
      {/* Enhanced Parallax Background Layers */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#628141]/5 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        style={{ y: shard1Y, rotate: shardRotate }}
        className="absolute top-20 right-[15%] w-32 h-32 border border-[#8BAE66]/10 rounded-[40px] pointer-events-none opacity-20"
      />
      <motion.div 
        style={{ y: shard2Y, rotate: useTransform(scrollYProgress, [0, 1], [0, -90]) }}
        className="absolute bottom-40 left-[5%] w-48 h-48 border border-[#EBD5AB]/5 rounded-full pointer-events-none opacity-10"
      />
      <motion.div 
        style={{ y: shard3Y }}
        className="absolute top-1/2 right-[5%] w-16 h-16 border-l border-[#8BAE66]/20 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-6 text-center lg:text-left">The Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#EBD5AB] text-center lg:text-left">
                Technological <span className="text-[#8BAE66]">Depth</span>.
            </h3>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full aspect-square max-w-[600px]"
          >
            <div className="absolute inset-0 bg-[#628141]/10 blur-[100px] rounded-full scale-75 animate-pulse" />
            
            <div className="w-full h-full glass rounded-[60px] border-[#EBD5AB]/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden p-6 sm:p-12 flex items-center justify-center">
              <div className="absolute top-10 left-10 w-10 h-10 border-t-2 border-l-2 border-[#8BAE66]/30" />
              <div className="absolute top-10 right-10 w-10 h-10 border-t-2 border-r-2 border-[#8BAE66]/30" />
              <div className="absolute bottom-10 left-10 w-10 h-10 border-b-2 border-l-2 border-[#8BAE66]/30" />
              <div className="absolute bottom-10 right-10 w-10 h-10 border-b-2 border-r-2 border-[#8BAE66]/30" />
              <div className="absolute inset-20 border border-[#8BAE66]/5 rounded-full" />
              <div className="absolute inset-40 border border-[#8BAE66]/5 rounded-full" />
              <div className="absolute inset-8 border border-dashed border-[#8BAE66]/20 rounded-full animate-[spin_40s_linear_infinite]" />

              <div className="w-full h-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="50%" data={PORTFOLIO_DATA.skills}>
                    <defs>
                      <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8BAE66" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#628141" stopOpacity={0.3} />
                      </linearGradient>
                      <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <PolarGrid stroke="#8BAE66" strokeOpacity={0.12} gridType="polygon" />
                    <PolarAngleAxis dataKey="subject" tick={(props) => <CustomAngleTick {...props} cx={props.cx} cy={props.cy} />} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Skills"
                      dataKey="level"
                      stroke="#8BAE66"
                      strokeWidth={2.5}
                      fill="url(#radarGrad)"
                      fillOpacity={0.5}
                      animationBegin={400}
                      animationDuration={2500}
                      animationEasing="ease-out"
                      filter="url(#radarGlow)"
                      dot={{ 
                        r: 4.5, 
                        fill: '#1B211A', 
                        stroke: '#8BAE66', 
                        strokeWidth: 2,
                        filter: 'drop-shadow(0px 0px 4px rgba(139, 174, 102, 0.8))'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#1B211A] border border-[#8BAE66]/20 flex items-center justify-center pointer-events-none">
                 <div className="w-3 h-3 rounded-full bg-[#8BAE66] shadow-[0_0_20px_#8BAE66] animate-pulse" />
              </div>
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              { icon: Cpu, label: "Core Stack", value: "Python, C, C++, Java, HTML, CSS, JavaScript, TypeScript" },
              { icon: Shield, label: "Cloud", value: "GitHub, Vercel, Netlify, Cloudflare" },
              { icon: Zap, label: "UI / Art", value: "Framer Motion, Tailwind, WebGL, Three.js, GSAP, Shaders" },
              { icon: Target, label: "Soft Skills", value: "Communication, Adaptability, Creativity, Management" }
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-[#EBD5AB]/5 border border-[#EBD5AB]/10 group hover:border-[#8BAE66]/40 transition-colors"
              >
                 <div className="flex items-center gap-3 mb-3">
                   <skill.icon size={16} className="text-[#8BAE66]" />
                   <span className="text-[10px] text-[#8BAE66] font-bold uppercase tracking-widest">{skill.label}</span>
                 </div>
                 <p className="text-[#EBD5AB]/80 text-lg">{skill.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
