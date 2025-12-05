import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReportHandler } from 'web-vitals';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
