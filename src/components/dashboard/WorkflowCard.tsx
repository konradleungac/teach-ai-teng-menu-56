
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Target, Clock, Lightbulb } from "lucide-react";

interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty?: string;
  time?: string;
  rating: number;
  users: number;
  tools?: number;
  isRecommended?: boolean;
  isNew?: boolean;
}

interface WorkflowCardProps {
  workflow: Workflow;
  isLarge?: boolean;
  onClick: (workflowId: string) => void;
}

const WorkflowCard = ({ workflow, isLarge = false, onClick }: WorkflowCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-elegant hover:-translate-y-1 ${
        isLarge ? 'md:col-span-2' : ''
      } ${workflow.isRecommended ? 'ring-2 ring-primary animate-glow-pulse' : ''}`}
      onClick={() => onClick(workflow.id)}
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
};

export default WorkflowCard;
