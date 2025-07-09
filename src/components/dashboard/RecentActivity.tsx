
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Activity {
  tool: string;
  time: string;
  result: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
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
          {activities.map((activity, index) => (
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
  );
};

export default RecentActivity;
