import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HeroSection from "@/components/dashboard/HeroSection";
import QuickStats from "@/components/dashboard/QuickStats";
import WorkflowSection from "@/components/dashboard/WorkflowSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Sidebar from "@/components/dashboard/Sidebar";
import TeachingAssistantBot from "@/components/TeachingAssistantBot";
import { workflows } from "@/data/workflows";
import favicon from "@/assets/favicon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserPreferences {
  name: string;
  subjects: string[];
  teachingStyle: string;
  experience: string;
}

const DEMO_FAVORITES = ["lesson-plan-basic", "quiz-generator", "smart-grading"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [recentActivity] = useState([
    {
      tool: "Quiz Generator",
      time: "2 hours ago",
      result: "Created 3 quizzes",
    },
    {
      tool: "Lesson Planner",
      time: "Yesterday",
      result: "Planned week's lessons",
    },
    {
      tool: "Grading Assistant",
      time: "3 days ago",
      result: "Graded 25 assignments",
    },
  ]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteTools");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("favoriteTools", JSON.stringify(DEMO_FAVORITES));
    return DEMO_FAVORITES;
  });
  const [showMathPack, setShowMathPack] = useState(false);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("userPreferences");
    if (storedPrefs) {
      setPreferences(JSON.parse(storedPrefs));
    }
  }, []);

  const handleWorkflowClick = (workflowId: string) => {
    if (workflowId === "math-pack") {
      setShowMathPack(true);
      return;
    }
    navigate(`/workflow/${workflowId}`);
  };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  const handleToolSelect = (toolId: string) => {
    navigate(`/workflow/${toolId}`);
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

  if (!preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Loading your personalized experience...
          </h1>
          <Button onClick={() => navigate("/onboarding")}>
            Complete Setup First
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <DashboardHeader
        userName={preferences.name}
        onCommunityClick={handleCommunityClick}
        onToolSelect={handleToolSelect}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <Sidebar onToolSelect={handleToolSelect} favorites={favorites} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="mb-12">
              <HeroSection
                name={preferences.name}
                subjects={preferences.subjects}
                experience={preferences.experience}
              />
              <QuickStats />
            </div>

            {/* Recent Activity - moved above "For Beginners" */}
            <div className="mb-12">
              <RecentActivity activities={recentActivity} />
            </div>

            {/* Main Toolkit Sections */}
            <div className="space-y-12">
              <WorkflowSection
                title="🥢 For Beginners"
                description="Simple, low-tech workflows to get you started"
                workflows={workflows.beginner}
                badgeText="Perfect for first-timers"
                badgeVariant="outline"
                onWorkflowClick={handleWorkflowClick}
                gridCols="3"
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />

              <WorkflowSection
                title="⭐ AI Recommendations"
                description="AI-optimized workflows based on your preferences"
                workflows={workflows.topPicks}
                badgeText="Personalized for you"
                badgeVariant="default"
                onWorkflowClick={handleWorkflowClick}
                gridCols="2"
                isLarge={true}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />

              <WorkflowSection
                title="📚 Subject Toolkits"
                description="Complete tool collections for specific subjects"
                workflows={workflows.subjectPacks}
                badgeText="All-in-one solutions"
                badgeVariant="outline"
                onWorkflowClick={handleWorkflowClick}
                gridCols="3"
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />

              <WorkflowSection
                title="👥 Community Favorites"
                description="Popular workflows shared by fellow teachers"
                workflows={workflows.community}
                badgeText="View All"
                showViewAll={true}
                onViewAllClick={handleCommunityClick}
                onWorkflowClick={handleWorkflowClick}
                gridCols="2"
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showMathPack} onOpenChange={setShowMathPack}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Interactive Math Workbench: Tools</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              workflows.subjectPacks.find((p) => p.id === "math-pack")
                ?.toolList ?? []
            ).map((tool) => (
              <div
                key={tool.id}
                className="border rounded-lg p-4 flex flex-col items-center bg-card shadow"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-bold text-lg mb-1">{tool.title}</div>
                <div className="text-sm text-muted-foreground mb-3 text-center">
                  {tool.description}
                </div>
                <Button
                  onClick={() => navigate(`/workflow/${tool.id}`)}
                  size="sm"
                  className="mt-auto"
                >
                  View Workflow
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <TeachingAssistantBot demoMode={true} />
    </div>
  );
};

export default Dashboard;
