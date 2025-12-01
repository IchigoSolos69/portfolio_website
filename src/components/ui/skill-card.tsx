import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Props for the SkillCard component.
 */
interface SkillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL for the skill icon. */
  iconSrc: string;
  /** The skill name (e.g., "React"). */
  name: string;
  /** The category of the skill (e.g., "Frontend"). */
  category: string;
  /** The proficiency level of the skill (0-100). */
  level: number;
  /** The experience in years. */
  experience: number;
  /** A callback function to be invoked when the "Learn More" button is clicked. */
  onLearnMore: (name: string) => void;
}

const SkillCard = React.forwardRef<HTMLDivElement, SkillCardProps>(
  ({ className, iconSrc, name, category, level, experience, onLearnMore, ...props }, ref) => {
    const isHighProficiency = level >= 80;
    const isMediumProficiency = level >= 50 && level < 80;
    
    // Format experience to show years
    const formattedExperience = `${experience} ${experience === 1 ? 'year' : 'years'}`;

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
        className={cn(
          "flex items-center justify-between w-full max-w-md p-4 bg-card text-card-foreground",
          "rounded-xl border shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {/* Left Section: Icon and Skill Info */}
        <div className="flex items-center gap-4">
          <img src={iconSrc} alt={`${name} icon`} className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-bold text-lg text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
        </div>

        {/* Right Section: Level and Action Button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <p className="font-semibold text-lg text-foreground">{level}%</p>
            <div className="flex items-center justify-end gap-1">
              {isHighProficiency ? (
                <Star className="h-4 w-4 text-yellow-500" />
              ) : isMediumProficiency ? (
                <TrendingUp className="h-4 w-4 text-blue-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn("text-sm", 
                isHighProficiency ? "text-yellow-500" : 
                isMediumProficiency ? "text-blue-500" : "text-red-500")}>
                {formattedExperience}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onLearnMore(name)}
            aria-label={`Learn more about ${name}`}
          >
            Details
          </Button>
        </div>
      </motion.div>
    );
  }
);

SkillCard.displayName = "SkillCard";

export { SkillCard };
