import React from "react";
import { Marquee } from "@/components/ui/marquee";
import AurasideLogo from "@/public/assets/logos/Auraside.jpg";
import GhastLogo from "@/public/assets/logos/Ghast.jpg";
import HoneLogo from "@/public/assets/logos/Hone.jpg";
import IntelLogo from "@/public/assets/logos/intel.svg";
 
const Logos = {
  auraside: () => (
    <div className="flex items-center gap-4">
      <img src={AurasideLogo} alt="Auraside" className="h-[40px] w-auto object-contain" />
      <span className="font-medium text-[#EBD5AB]">Auraside</span>
    </div>
  ),
  ghast: () => (
    <div className="flex items-center gap-4">
      <img src={GhastLogo} alt="Ghast" className="h-[40px] w-auto object-contain" />
      <span className="font-medium text-[#EBD5AB]">Ghast</span>
    </div>
  ),
  hone: () => (
    <div className="flex items-center gap-4">
      <img src={HoneLogo} alt="Hone" className="h-[40px] w-auto object-contain" />
      <span className="font-medium text-[#EBD5AB]">Hone</span>
    </div>
  ),
  intel: () => (
    <div className="flex items-center gap-4">
      <img src={IntelLogo} alt="Intel" className="h-[28px] w-auto object-contain" />
      <span className="font-medium text-[#EBD5AB]">Intel</span>
    </div>
  ),
};

export function OrganizationsMarquee() {
  return (
    <section className="py-24 bg-[#1B211A] relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center flex flex-col items-center">
          <span className="text-s font-bold tracking-[0.4em] uppercase text-[#EBD5AB] mb-12 opacity-80">
            Companies and organizations I've had the privilege to work with
          </span>
        </div>
        
        {/* Marquee with improved fading mask (fadeWidth prop can be customized here if needed) */}
        <div className="relative w-full">
          <Marquee speed={40} fadeWidth="15%">
            {Object.values(Logos).map((Logo, index) => (
              <div
                key={index}
                className="relative h-16 w-fit flex items-center justify-center text-[#8BAE66] opacity-60 hover:opacity-100 hover:text-[#EBD5AB] transition-all duration-500 cursor-default px-8"
              >
                <Logo />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}