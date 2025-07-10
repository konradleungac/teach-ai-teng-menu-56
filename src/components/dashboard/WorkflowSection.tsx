import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import WorkflowCard from "./WorkflowCard";

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

interface WorkflowSectionProps {
  title: string;
  description: string;
  workflows: Workflow[];
  badgeText: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  onWorkflowClick: (workflowId: string) => void;
  gridCols?: "2" | "3";
  isLarge?: boolean;
  favorites?: string[];
  toggleFavorite?: (workflowId: string) => void;
}

const WorkflowSection = ({
  title,
  description,
  workflows,
  badgeText,
  badgeVariant = "outline",
  showViewAll = false,
  onViewAllClick,
  onWorkflowClick,
  gridCols = "3",
  isLarge = false,
  favorites = [],
  toggleFavorite,
}: WorkflowSectionProps) => {
  const gridClasses =
    gridCols === "2"
      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {showViewAll && onViewAllClick ? (
          <Button variant="outline" onClick={onViewAllClick}>
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Badge
            variant={badgeVariant}
            className={
              badgeVariant === "default"
                ? "bg-gradient-primary text-sm"
                : "text-sm"
            }
          >
            {badgeText}
          </Badge>
        )}
      </div>
      <div className={gridClasses}>
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            isLarge={isLarge}
            onClick={onWorkflowClick}
            isFavorite={favorites.includes(workflow.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
