import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X,
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  Award,
  CheckCircle,
  BarChart3,
  Target,
  Heart
} from "lucide-react";

interface VisualFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  workflowTitle: string;
  metrics: {
    timeSaved: string;
    studentImpact: string;
    engagementIncrease: string;
    accuracyScore: string;
  };
}

const VisualFeedback = ({ isOpen, onClose, workflowTitle, metrics }: VisualFeedbackProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Animate progress
      const progressTimer = setTimeout(() => {
        setAnimatedProgress(85);
      }, 500);

      // Show results after progress animation
      const resultsTimer = setTimeout(() => {
        setShowResults(true);
      }, 2000);

      return () => {
        clearTimeout(progressTimer);
        clearTimeout(resultsTimer);
      };
    } else {
      setAnimatedProgress(0);
      setShowResults(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl animate-scale-in shadow-elegant">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-foreground">Workflow Complete!</CardTitle>
            <CardDescription className="text-lg">{workflowTitle}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Processing Animation */}
          {!showResults && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Analyzing your results...</p>
              <Progress value={animatedProgress} className="w-full h-2" />
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animation-delay-200"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-6 animate-fade-in">
              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{metrics.timeSaved}</p>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{metrics.studentImpact}</p>
                    <p className="text-sm text-muted-foreground">Student Impact</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <CardContent className="p-4 text-center">
                    <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{metrics.engagementIncrease}</p>
                    <p className="text-sm text-muted-foreground">Engagement Boost</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{metrics.accuracyScore}</p>
                    <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  </CardContent>
                </Card>
              </div>

              {/* Success Message */}
              <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-6 text-center border border-success/20">
                <Award className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Exceptional Results!</h3>
                <p className="text-muted-foreground mb-4">
                  Your workflow has achieved outstanding results. Based on similar implementations, 
                  you can expect sustained improvements in student engagement and learning outcomes.
                </p>
                <div className="flex justify-center gap-2">
                  <Badge className="bg-gradient-success">Top 10% Performance</Badge>
                  <Badge variant="outline">Teacher Approved</Badge>
                </div>
              </div>

              {/* Visual Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Impact Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Student Comprehension</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-32 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Assignment Quality</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-32 h-2" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time Efficiency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-32 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Sharing */}
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-red-400" />
                    <div>
                      <h3 className="font-semibold text-foreground">Share Your Success</h3>
                      <p className="text-sm text-muted-foreground">Help fellow teachers by sharing your experience</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Share with Community
                    </Button>
                    <Button variant="outline" size="sm">
                      Rate This Workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="gradient" className="flex-1">
                  Download Results
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualFeedback;