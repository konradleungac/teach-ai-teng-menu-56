
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Lightbulb, TrendingUp } from "lucide-react";

const QuickStats = () => {
  return (
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
  );
};

export default QuickStats;
