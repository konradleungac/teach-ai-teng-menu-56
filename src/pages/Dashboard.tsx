import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Target,
  Lightbulb,
  Award,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import aiToolsMenu from "@/assets/ai-tools-menu.jpg";

interface UserPreferences {
  name: string;
  subjects: string[];
  teachingStyle: string;
  experience: string;
}

// Mock data for the prototype
const workflows = {
  beginner: [
    {
      id: "lesson-plan-basic",
      title: "Quick Lesson Planner",
      description: "Create structured lesson plans in minutes",
      icon: "📋",
      difficulty: "Beginner",
      time: "5 min",
      rating: 4.8,
      users: 1240
    },
    {
      id: "quiz-generator",
      title: "Simple Quiz Maker",
      description: "Generate quick assessments from your content",
      icon: "✅",
      difficulty: "Beginner", 
      time: "3 min",
      rating: 4.7,
      users: 980
    },
    {
      id: "homework-helper",
      title: "Homework Assistant",
      description: "Create and grade homework assignments",
      icon: "📝",
      difficulty: "Beginner",
      time: "8 min", 
      rating: 4.6,
      users: 760
    }
  ],
  topPicks: [
    {
      id: "smart-grading",
      title: "AI-Powered Grading Suite",
      description: "Comprehensive grading with detailed feedback",
      icon: "🎯",
      difficulty: "Intermediate",
      time: "10 min",
      rating: 4.9,
      users: 2100,
      isRecommended: true
    },
    {
      id: "engagement-tracker",
      title: "Student Engagement Analytics",
      description: "Track and improve student participation",
      icon: "📊", 
      difficulty: "Advanced",
      time: "15 min",
      rating: 4.8,
      users: 1850
    },
    {
      id: "differentiation-pack",
      title: "Differentiation Toolkit",
      description: "Adapt content for all learning styles",
      icon: "🔄",
      difficulty: "Intermediate",
      time: "12 min",
      rating: 4.9,
      users: 1920
    }
  ],
  subjectPacks: [
    {
      id: "science-pack",
      title: "Middle School Science RAG Pack",
      description: "Complete science teaching workflows",
      subjects: ["Science"],
      icon: "🔬",
      tools: 8,
      rating: 4.9,
      users: 890
    },
    {
      id: "english-pack", 
      title: "ELA Writing & Reading Suite",
      description: "Comprehensive language arts tools",
      subjects: ["English"],
      icon: "📚",
      tools: 12,
      rating: 4.8,
      users: 1200
    },
    {
      id: "math-pack",
      title: "Interactive Math Workbench", 
      description: "Problem solving and assessment tools",
      subjects: ["Math"],
      icon: "🔢",
      tools: 10,
      rating: 4.7,
      users: 1050
    }
  ],
  community: [
    {
      id: "peer-review",
      title: "Peer Review Workshop",
      description: "Collaborative lesson planning with colleagues",
      icon: "👥",
      difficulty: "Intermediate",
      time: "20 min",
      rating: 4.8,
      users: 650,
      isNew: true
    },
    {
      id: "parent-communication",
      title: "Parent Communication Hub",
      description: "Streamline parent-teacher interactions",
      icon: "💬",
      difficulty: "Beginner",
      time: "5 min", 
      rating: 4.6,
      users: 820
    }
  ]
};

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

  const renderWorkflowCard = (workflow: any, isLarge = false) => (
    <Card 
      key={workflow.id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-elegant hover:-translate-y-1 ${
        isLarge ? 'md:col-span-2' : ''
      } ${workflow.isRecommended ? 'ring-2 ring-primary animate-glow-pulse' : ''}`}
      onClick={() => handleWorkflowClick(workflow.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{workflow.icon}</div>
            <div>
              <CardTitle className="text-lg">{workflow.title}</CardTitle>
              <CardDescription className="text-sm">{workflow.description}</CardDescription>
            </div>
          </div>
          {workflow.isRecommended && (
            <Badge className="bg-gradient-primary">Recommended</Badge>
          )}
          {workflow.isNew && (
            <Badge variant="secondary">New</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {workflow.difficulty && (
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                {workflow.difficulty}
              </span>
            )}
            {workflow.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {workflow.time}
              </span>
            )}
            {workflow.tools && (
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                {workflow.tools} tools
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{workflow.rating}</span>
            <span>({workflow.users})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Good morning, {preferences.name}! ☀️
              </h1>
              <p className="text-muted-foreground">Ready to make teaching easier today?</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleCommunityClick}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Community
              </Button>
              <Button onClick={() => navigate('/onboarding')}>
                <Target className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden shadow-elegant mb-6">
            <img 
              src={aiToolsMenu} 
              alt="AI Teaching Tools" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-xl text-white">
                  <h2 className="text-3xl font-bold mb-3">Your Teaching Toolkit</h2>
                  <p className="text-lg opacity-90 mb-4">
                    We've organized our AI tools into clear categories to help you find exactly what you need.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Tested by 10K+ teachers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Save 3+ hours weekly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-success text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Time Saved This Week</p>
                    <p className="text-2xl font-bold">4.5 hours</p>
                  </div>
                  <Clock className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tools Used</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Student Impact</p>
                    <p className="text-2xl font-bold text-foreground">89%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Toolkit Sections */}
        <div className="space-y-12">
          {/* For Beginners */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">🥢 For Beginners</h2>
                <p className="text-muted-foreground">Simple, low-tech workflows to get you started</p>
              </div>
              <Badge variant="outline" className="text-sm">Perfect for first-timers</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.beginner.map(workflow => renderWorkflowCard(workflow))}
            </div>
          </section>

          {/* Top Picks */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">⭐ AI Recommendations</h2>
                <p className="text-muted-foreground">AI-optimized workflows based on your preferences</p>
              </div>
              <Badge className="bg-gradient-primary text-sm">Personalized for you</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.topPicks.map(workflow => renderWorkflowCard(workflow, true))}
            </div>
          </section>

          {/* Subject Packs */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">📚 Subject Toolkits</h2>
                <p className="text-muted-foreground">Complete tool collections for specific subjects</p>
              </div>
              <Badge variant="outline" className="text-sm">All-in-one solutions</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.subjectPacks.map(workflow => renderWorkflowCard(workflow))}
            </div>
          </section>

          {/* Community Favorites */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">👥 Community Favorites</h2>
                <p className="text-muted-foreground">Popular workflows shared by fellow teachers</p>
              </div>
              <Button variant="outline" onClick={handleCommunityClick}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.community.map(workflow => renderWorkflowCard(workflow))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest tool usage and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{activity.tool}</p>
                        <p className="text-sm text-muted-foreground">{activity.result}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;