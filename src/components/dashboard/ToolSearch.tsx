
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { workflows } from "@/data/workflows";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty?: string;
  category: string;
}

interface ToolSearchProps {
  onToolSelect: (toolId: string) => void;
}

const ToolSearch = ({ onToolSelect }: ToolSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Flatten all workflows into searchable items
  const getAllTools = (): SearchResult[] => {
    const tools: SearchResult[] = [];
    
    workflows.beginner.forEach(tool => 
      tools.push({ ...tool, category: "Beginner" })
    );
    workflows.topPicks.forEach(tool => 
      tools.push({ ...tool, category: "AI Recommendations" })
    );
    workflows.subjectPacks.forEach(tool => 
      tools.push({ ...tool, category: "Subject Toolkits" })
    );
    workflows.community.forEach(tool => 
      tools.push({ ...tool, category: "Community Favorites" })
    );

    return tools;
  };

  // Search function
  const searchTools = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const allTools = getAllTools();
    const lowercaseQuery = searchQuery.toLowerCase();
    
    return allTools.filter(tool => 
      tool.title.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 6); // Limit to 6 results
  };

  // Handle search input
  useEffect(() => {
    const searchResults = searchTools(query);
    setResults(searchResults);
    setIsOpen(query.length > 0 && searchResults.length > 0);
  }, [query]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToolClick = (toolId: string) => {
    onToolSelect(toolId);
    setQuery("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-72">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            <div className="space-y-1">
              {results.map((tool) => (
                <button
                  key={`${tool.category}-${tool.id}`}
                  onClick={() => handleToolClick(tool.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{tool.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                      {tool.difficulty && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {tool.difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ToolSearch;
