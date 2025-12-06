import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  name?: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div 
      className={`relative mx-auto max-w-3xl bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/50 py-6 md:border-x border-slate-800 ${className || ''}`}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-gray-700" />

      <InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
        {logos.map((logo) => (
          <div
            key={`logo-${logo.alt}`}
            className="flex items-center gap-3 px-4 py-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <img
              alt={logo.alt}
              className="pointer-events-none h-6 select-none md:h-8 object-contain"
              height="auto"
              loading="lazy"
              src={logo.src}
              width="auto"
              style={{ maxWidth: '80px' }}
            />
            {logo.name && (
              <span className="text-slate-300 text-sm md:text-base font-medium whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-gray-700" />
    </div>
  );
}

