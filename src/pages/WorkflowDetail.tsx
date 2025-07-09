import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import VisualFeedback from "@/components/VisualFeedback";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Download,
  Share,
  Heart,
  TrendingUp,
  FileText,
  Lightbulb
} from "lucide-react";

// Mock workflow data
const workflowData: Record<string, any> = {
  "lesson-plan-basic": {
    title: "Quick Lesson Planner",
    description: "Create structured lesson plans in minutes with AI assistance",
    icon: "📋",
    difficulty: "Beginner",
    estimatedTime: "5 minutes",
    rating: 4.8,
    users: 1240,
    steps: [
      {
        title: "Set Learning Objectives",
        description: "Define what students should learn and achieve",
        input: "topic"
      },
      {
        title: "Generate Content Structure", 
        description: "AI creates a lesson outline based on best practices",
        automated: true
      },
      {
        title: "Customize Activities",
        description: "Modify activities to match your teaching style",
        input: "preferences"
      },
      {
        title: "Review & Export",
        description: "Finalize your lesson plan and download",
        automated: true
      }
    ],
    tags: ["Lesson Planning", "Curriculum", "Time-Saving"],
    category: "Planning"
  },
  "smart-grading": {
    title: "AI-Powered Grading Suite",
    description: "Comprehensive grading with detailed feedback and analytics",
    icon: "🎯",
    difficulty: "Intermediate",
    estimatedTime: "10 minutes",
    rating: 4.9,
    users: 2100,
    steps: [
      {
        title: "Upload Assignments",
        description: "Submit student work for AI analysis",
        input: "files"
      },
      {
        title: "Set Grading Criteria",
        description: "Define rubrics and expectations",
        input: "rubric"
      },
      {
        title: "AI Analysis",
        description: "Advanced AI evaluates work and suggests grades",
        automated: true
      },
      {
        title: "Review & Provide Feedback",
        description: "Review AI suggestions and add personal comments",
        input: "feedback"
      },
      {
        title: "Generate Reports",
        description: "Create detailed progress reports for students",
        automated: true
      }
    ],
    tags: ["Grading", "Assessment", "Feedback", "Analytics"],
    category: "Assessment"
  }
};

const WorkflowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const workflow = workflowData[id || ""];

  useEffect(() => {
    if (!workflow) {
      navigate('/dashboard');
    }
  }, [workflow, navigate]);

  const handleStart = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < workflow.steps.length) {
      setCurrentStep(nextStep);
      setProgress((nextStep / workflow.steps.length) * 100);
    } else {
      // Simulate completion
      setResults({
        lessonPlan: "Your comprehensive lesson plan has been generated with 5 activities, 3 assessments, and differentiated instructions for various learning styles.",
        studentImpact: "Expected to improve student engagement by 25% based on similar lesson structures.",
        timesSaved: "3.5 hours compared to manual planning"
      });
      setProgress(100);
      setShowFeedback(true);
    }
    setUserInput("");
  };

  const simulateAIProcessing = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsRunning(false);
    setResults(null);
    setUserInput("");
  };

  if (!workflow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{workflow.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{workflow.title}</h1>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Workflow Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Estimated Time</p>
              <p className="text-lg font-semibold text-foreground">{workflow.estimatedTime}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="text-lg font-semibold text-foreground">{workflow.rating}/5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Teachers Using</p>
              <p className="text-lg font-semibold text-foreground">{workflow.users.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        {isRunning && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <Progress value={progress} className="w-full" />
            </CardHeader>
          </Card>
        )}

        {/* Results */}
        {results && (
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Workflow Complete!
              </CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <h3 className="font-semibold text-success mb-2">Generated Content</h3>
                <p className="text-sm">{results.lessonPlan}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary">Expected Impact</h4>
                  </div>
                  <p className="text-sm">{results.studentImpact}</p>
                </div>
                
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-accent">Time Saved</h4>
                  </div>
                  <p className="text-sm">{results.timesSaved}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="bg-gradient-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Results
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Run Again
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workflow Steps */}
        {!results && (
          <Card>
            <CardHeader>
              <CardTitle>Workflow Steps</CardTitle>
              <CardDescription>
                {isRunning ? "Follow the steps below to complete your workflow" : "Here's what this workflow will do"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workflow.steps.map((step: any, index: number) => (
                  <div 
                    key={index}
                    className={`flex gap-4 p-4 rounded-lg border ${
                      isRunning && index === currentStep 
                        ? 'border-primary bg-primary/5' 
                        : index < currentStep 
                        ? 'border-success bg-success/5' 
                        : 'border-border'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < currentStep 
                        ? 'bg-success text-white' 
                        : index === currentStep && isRunning
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      
                      {isRunning && index === currentStep && step.input && (
                        <div className="space-y-3">
                          <Textarea
                            placeholder={
                              step.input === 'topic' ? 'Enter your lesson topic (e.g., "Photosynthesis for 7th grade")' :
                              step.input === 'preferences' ? 'Describe your teaching preferences and classroom setup' :
                              step.input === 'rubric' ? 'Define your grading criteria and expectations' :
                              step.input === 'feedback' ? 'Add any specific feedback points' :
                              'Enter your input here...'
                            }
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="min-h-20"
                          />
                          <Button 
                            onClick={handleNextStep}
                            disabled={!userInput.trim()}
                            className="bg-gradient-primary"
                          >
                            Continue <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </Button>
                        </div>
                      )}
                      
                      {isRunning && index === currentStep && step.automated && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-primary">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-sm">AI is processing...</span>
                          </div>
                          <Button 
                            onClick={handleNextStep}
                            className="bg-gradient-primary"
                          >
                            Continue <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!isRunning && (
                <div className="pt-6 text-center">
                  <Button onClick={handleStart} size="lg" className="bg-gradient-primary">
                    <Play className="w-5 h-5 mr-2" />
                    Start Workflow
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {workflow.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Feedback Modal */}
      <VisualFeedback 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        workflowTitle={workflow.title}
        metrics={{
          timeSaved: "3.5 hours",
          studentImpact: "89%",
          engagementIncrease: "25%",
          accuracyScore: "92%"
        }}
      />
    </div>
  );
};

export default WorkflowDetail;