import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, BookOpen, Users, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      // Redirect to dashboard if already onboarded
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">GoodClass.ai</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your personalized AI teaching assistant, designed specifically for middle school educators. 
              Experience the power of AI through our intuitive, organized interface.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Personalized for you</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Curriculum-aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Teacher-approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Made with care</span>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={() => navigate('/onboarding')}
              variant="glow"
              className="text-lg px-8 py-6"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🥢</div>
                <CardTitle>Organized Experience</CardTitle>
                <CardDescription>
                  Browse organized tool categories designed for easy discovery and seamless workflow
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🎯</div>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Get AI-powered suggestions based on your subject, teaching style, and experience level
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">👥</div>
                <CardTitle>Community-Driven</CardTitle>
                <CardDescription>
                  Learn from fellow teachers' success stories and share your own experiences
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-card rounded-lg shadow-elegant">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to transform your teaching experience?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of middle school teachers who have already discovered the power of personalized AI assistance.
            </p>
            <Button 
              onClick={() => navigate('/onboarding')}
              variant="gradient"
            >
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
