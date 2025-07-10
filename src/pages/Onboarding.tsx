import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Users, Target, Heart } from "lucide-react";
import heroTeacher from "@/assets/hero-teacher.jpg";
import favicon from "@/assets/favicon.png";

const subjects = [
  { id: "english", name: "English Language Arts", icon: "📚" },
  { id: "math", name: "Mathematics", icon: "🔢" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "social-studies", name: "Social Studies", icon: "🌍" },
  { id: "art", name: "Arts & Creative", icon: "🎨" },
  { id: "other", name: "Other", icon: "📖" },
];

const teachingStyles = [
  {
    id: "collaborative",
    name: "Collaborative Learning",
    description: "Group work and peer interaction",
  },
  {
    id: "visual",
    name: "Visual Learning",
    description: "Charts, diagrams, and multimedia",
  },
  {
    id: "hands-on",
    name: "Hands-On Activities",
    description: "Interactive and experiential learning",
  },
  {
    id: "traditional",
    name: "Traditional Instruction",
    description: "Structured lessons and direct teaching",
  },
];

const experience = [
  { id: "new", name: "New to Teaching", description: "0-2 years" },
  { id: "developing", name: "Developing Educator", description: "3-7 years" },
  { id: "experienced", name: "Experienced Teacher", description: "8+ years" },
  {
    id: "mentor",
    name: "Mentor Teacher",
    description: "Leading and mentoring others",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [name, setName] = useState("");

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleComplete = () => {
    // Store preferences in localStorage for the prototype
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        name,
        subjects: selectedSubjects,
        teachingStyle: selectedStyle,
        experience: selectedExperience,
      })
    );
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              {/* Removed heroTeacher image and overlay */}

              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome to Goodclass AI
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your AI Teaching Assistant
              </p>
              <div className="flex flex-col items-center mb-8">
                <img
                  src={favicon}
                  alt="Goodclass AI logo"
                  className="w-32 h-32 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Curriculum-aligned tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Community support</span>
                </div>
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle>Let's Get Started</CardTitle>
                <CardDescription>
                  Tell us a bit about yourself to get personalized
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    What should we call you?
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ms. Johnson"
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!name.trim()}
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                What subjects do you teach?
              </h2>
              <p className="text-muted-foreground">
                Select all that apply - we'll customize your tool
                recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                    selectedSubjects.includes(subject.id)
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSubjectToggle(subject.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{subject.icon}</div>
                    <h3 className="font-semibold text-foreground">
                      {subject.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={selectedSubjects.length === 0}
              >
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                What's your teaching style?
              </h2>
              <p className="text-muted-foreground">
                This helps us recommend workflows that match your approach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {teachingStyles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                    selectedStyle === style.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      {style.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {style.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!selectedStyle}>
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Teaching experience?
              </h2>
              <p className="text-muted-foreground">
                We'll adjust our recommendations to your comfort level with new
                tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {experience.map((exp) => (
                <Card
                  key={exp.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                    selectedExperience === exp.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedExperience(exp.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      {exp.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!selectedExperience}
                variant="gradient"
              >
                Complete Setup <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
