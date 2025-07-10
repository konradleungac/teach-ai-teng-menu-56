import { Card, CardContent } from "@/components/ui/card";
import { Award, TrendingUp } from "lucide-react";
import aiToolsMenu from "@/assets/ai-tools-menu.jpg";

interface HeroSectionProps {
  name: string;
  subjects: string[];
  experience: string;
}

const HeroSection = ({ name, subjects, experience }: HeroSectionProps) => {
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
          <div className="w-full text-white">
            <h2 className="text-3xl font-bold mb-3 w-full">Welcome {name}</h2>
            <p className="text-lg opacity-90 mb-4 w-full">
              {(() => {
                const formattedSubjects =
                  subjects && subjects.length > 0
                    ? subjects
                        .map((s) =>
                          s
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        )
                        .join(", ")
                    : "various subjects";
                let experienceText = "a unique";
                if (experience) {
                  if (experience === "new")
                    experienceText = "0-2 years of teaching";
                  else if (experience === "developing")
                    experienceText = "3-7 years of teaching";
                  else if (experience === "experienced")
                    experienceText = "8+ years of teaching";
                  else if (experience === "mentor")
                    experienceText = "experience as a mentor teacher";
                }
                return `You teach ${formattedSubjects} and have ${experienceText} experience. We're here to help you make the most of your expertise with AI-powered tools and resources tailored just for you.`;
              })()}
            </p>
            {/* Optionally keep the stats row below, or remove if not needed */}
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
