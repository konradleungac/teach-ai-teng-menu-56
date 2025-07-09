
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HeroSection from "@/components/dashboard/HeroSection";
import QuickStats from "@/components/dashboard/QuickStats";
import WorkflowSection from "@/components/dashboard/WorkflowSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TeachingAssistantBot from "@/components/TeachingAssistantBot";
import Sidebar from "@/components/dashboard/Sidebar";
import { workflows } from "@/data/workflows";

interface UserPreferences {
  name: string;
  subjects: string[];
  teachingStyle: string;
  experience: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [recentActivity] = useState([
    { tool: "Quiz Generator", time: "2 hours ago", result: "Created 3 quizzes" },
    { tool: "Lesson Planner", time: "Yesterday", result: "Planned week's lessons" },
    { tool: "Grading Assistant", time: "3 days ago", result: "Graded 25 assignments" }
  ]);

  useEffect(() => {
    const storedPrefs = localStorage.getItem('userPreferences');
    if (storedPrefs) {
      setPreferences(JSON.parse(storedPrefs));
    }
  }, []);

  const handleWorkflowClick = (workflowId: string) => {
    navigate(`/workflow/${workflowId}`);
  };

  const handleCommunityClick = () => {
    navigate('/community');
  };

  const handleToolSelect = (toolId: string) => {
    navigate(`/workflow/${toolId}`);
  };

  if (!preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading your personalized experience...</h1>
          <Button onClick={() => navigate('/onboarding')}>
            Complete Setup First
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex">
      <Sidebar onToolSelect={handleToolSelect} />
      
      <div className="flex-1">
        <DashboardHeader 
          userName={preferences.name}
          onCommunityClick={handleCommunityClick}
          onToolSelect={handleToolSelect}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <HeroSection />
            <QuickStats />
          </div>

          {/* Recent Activity - moved up */}
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
            />

            <WorkflowSection
              title="📚 Subject Toolkits"
              description="Complete tool collections for specific subjects"
              workflows={workflows.subjectPacks}
              badgeText="All-in-one solutions"
              badgeVariant="outline"
              onWorkflowClick={handleWorkflowClick}
              gridCols="3"
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
            />
          </div>
        </div>
      </div>

      <TeachingAssistantBot />
    </div>
  );
};

export default Dashboard;
