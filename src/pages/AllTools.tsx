import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import WorkflowCard from "@/components/dashboard/WorkflowCard";
import { workflows as workflowsData } from "@/data/workflows";
import { Input } from "@/components/ui/input";
import favicon from "@/assets/favicon.png";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import TeachingAssistantBot from "@/components/TeachingAssistantBot";

// Flatten all workflows into a single array
const allWorkflows = [
  ...workflowsData.beginner,
  ...workflowsData.topPicks,
  ...workflowsData.subjectPacks,
  ...workflowsData.community,
];

const DEMO_FAVORITES = ["lesson-plan-basic", "quiz-generator", "smart-grading"];

const AllTools = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteTools");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("favoriteTools", JSON.stringify(DEMO_FAVORITES));
    return DEMO_FAVORITES;
  });
  const navigate = useNavigate();
  const filtered = useMemo(
    () =>
      allWorkflows.filter(
        (w) =>
          w.title.toLowerCase().includes(search.toLowerCase()) ||
          w.description.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleCardClick = (id: string) => {
    window.location.href = `/workflow/${id}`;
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((fid) => fid !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favoriteTools", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>All Tools | Teach AI</title>
        <meta
          name="description"
          content="Browse all AI-powered teaching tools. Find, search, and explore the full suite of tools to enhance your teaching workflow."
        />
        <link rel="icon" type="image/png" href={favicon} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "All Tools",
            "itemListElement": [
              ${filtered
                .map(
                  (w, i) => `{
                "@type": "ListItem",
                "position": ${i + 1},
                "name": "${w.title}",
                "description": "${w.description}"
              }`
                )
                .join(",")}
            ]
          }
        `}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
          All Tools
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Browse, search, and discover every tool available to supercharge your
          teaching. Inspired by the best of AI for educators.
        </p>
        <div className="mb-8 max-w-md">
          <Input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            aria-label="Search tools"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((tool) => (
            <div key={tool.id} className="relative group">
              <WorkflowCard workflow={tool} onClick={handleCardClick} />
              <button
                aria-label={
                  favorites.includes(tool.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tool.id);
                }}
                className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-1 shadow group-hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorites.includes(tool.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                  strokeWidth={2}
                  fill={favorites.includes(tool.id) ? "#ef4444" : "none"}
                />
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground mt-16 text-lg">
            No tools found matching your search.
          </div>
        )}
      </div>
      <TeachingAssistantBot />
    </div>
  );
};

export default AllTools;
