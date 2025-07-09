
import { Card, CardContent } from "@/components/ui/card";
import { Award, TrendingUp } from "lucide-react";
import aiToolsMenu from "@/assets/ai-tools-menu.jpg";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
