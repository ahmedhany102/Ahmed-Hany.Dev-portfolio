
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillProgressProps {
  name: string;
  level: number;
  color: string;
  isVisible: boolean;
  description: string;
}

export const SkillProgress = ({ name, level, color, isVisible, description }: SkillProgressProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      // Add a small delay before showing tooltip to avoid it appearing during animations
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isVisible]);
  
  return (
    <motion.div
      className="bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <motion.h3 
          className="text-lg font-medium"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: isVisible ? 0 : -10, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.div
          className={`px-2 py-1 rounded text-xs text-white ${color}`}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: isVisible ? 0 : 10, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {Math.round(level)}%
        </motion.div>
      </div>

      <div className="w-full bg-muted rounded-full h-2.5 mb-4 overflow-hidden">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <motion.div
                className="h-2.5 rounded-full"
                style={{ backgroundColor: color.replace('bg-', '') }}
                initial={{ width: "0%" }}
                animate={{ width: isVisible || isHovered ? `${level}%` : "0%" }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  delay: isHovered ? 0 : 0.3
                }}
              />
            </TooltipTrigger>
            {showTooltip && (
              <TooltipContent>
                <p>{level}% proficiency</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <motion.p 
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
