
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

interface WorkflowStepsProps {
  title: string;
  steps: WorkflowStep[];
}

const WorkflowSteps = ({ title, steps }: WorkflowStepsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground">Here's what this workflow will do</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center">
                {step.number}
              </Badge>
              <div>
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSteps;
