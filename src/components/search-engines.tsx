import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchEngines } from '@/lib/bangs';

export function SearchEngines() {
  const [hoveredEngine, setHoveredEngine] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter search engines based on search query
  const filteredEngines = useMemo(() => {
    if (!searchQuery.trim()) return searchEngines;

    const query = searchQuery.toLowerCase();
    return searchEngines.filter(
      (engine) =>
        engine.name.toLowerCase().includes(query) ||
        engine.description.toLowerCase().includes(query) ||
        engine.category.toLowerCase().includes(query) ||
        engine.prefixes.some((prefix) => prefix.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group engines by category
  const enginesByCategory = useMemo(() => {
    return filteredEngines.reduce((acc, engine) => {
      if (!acc[engine.category]) {
        acc[engine.category] = [];
      }
      acc[engine.category].push(engine);
      return acc;
    }, {} as Record<string, typeof searchEngines>);
  }, [filteredEngines]);

  const categories = useMemo(
    () => Object.keys(enginesByCategory).sort(),
    [enginesByCategory]
  );

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 w-full justify-between"
        variant="outline"
      >
        {isExpanded ? 'Hide Search Platforms' : 'Show Search Platforms'}
        {isExpanded ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search platforms by name, category, or prefix..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {categories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No search platforms found matching "{searchQuery}"
              </p>
            ) : (
              categories.map((category) => (
                <div key={category} className="space-y-4">
                  <h2 className="text-xl font-bold">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {enginesByCategory[category].map((engine) => (
                      <motion.div
                        key={engine.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setHoveredEngine(engine.name)}
                        onMouseLeave={() => setHoveredEngine(null)}
                      >
                        <Card className="overflow-hidden border border-border/40 bg-card/30 transition-all duration-300 h-full">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: engine.color,
                                  color: '#fff',
                                }}
                              >
                                {engine.icon}
                              </div>
                              <CardTitle className="text-lg">
                                {engine.name}
                              </CardTitle>
                            </div>
                            <CardDescription>
                              {engine.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {engine.prefixes.map((prefix) => (
                                <Badge
                                  key={prefix}
                                  variant="outline"
                                  className={`${
                                    hoveredEngine === engine.name
                                      ? 'bg-primary/10 border-primary/30'
                                      : ''
                                  } transition-colors duration-300`}
                                >
                                  {prefix}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
