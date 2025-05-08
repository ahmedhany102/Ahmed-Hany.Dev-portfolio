
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'coming-soon';

interface SkillsFilterProps {
  activeCategory: SkillCategory;
  setActiveCategory: (category: SkillCategory) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearFilters: () => void;
}

export function SkillsFilter({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  onClearFilters
}: SkillsFilterProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [prevCategory, setPrevCategory] = useState<SkillCategory>(activeCategory);
  
  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' },
    { id: 'coming-soon', label: 'Coming Soon' },
  ];
  
  useEffect(() => {
    if (prevCategory !== activeCategory) {
      // Show toast notification when category changes
      if (activeCategory !== 'all') {
        toast.info(`Filtered to ${activeCategory} skills`, {
          duration: 2000,
          position: 'bottom-right',
        });
      }
      setPrevCategory(activeCategory);
    }
  }, [activeCategory, prevCategory]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      toast.info(`Searching for "${e.target.value}"`, {
        duration: 2000,
        position: 'bottom-right',
      });
    }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex justify-center w-full md:w-auto mb-4 md:mb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <ToggleGroup type="single" value={activeCategory} onValueChange={(value) => value && setActiveCategory(value as SkillCategory)}>
              {categories.map((category) => (
                <ToggleGroupItem 
                  key={category.id} 
                  value={category.id}
                  className="transition-all duration-300"
                  variant="outline"
                >
                  {category.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="relative w-full md:w-auto">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="px-4 py-2 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full max-w-xs transition-all duration-300"
          />
          <Search 
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </motion.div>
        
        {(searchTerm || activeCategory !== 'all') && (
          <motion.div 
            className="mt-2 text-right"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-xs"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
