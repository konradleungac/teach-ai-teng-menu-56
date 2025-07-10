import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  suggestions?: ToolSuggestion[];
}

interface ToolSuggestion {
  id: string;
  title: string;
  description: string;
  icon: string;
  relevanceScore: number;
}

interface TeachingAssistantBotProps {
  demoMode?: boolean;
}

const DEMO_CONVERSATION: Message[] = [
  {
    id: "welcome",
    text: "Hi! I'm your teaching assistant. What are you working on today? I can help you find the perfect tools for your tasks!\n\nWhat can this chatbot do? Ask me about lesson planning, grading, student engagement, or finding the right tools for your teaching tasks. I can recommend features, guide you to workflows, and help you get the most out of this platform!",
    isUser: false,
  },
  {
    id: "user1",
    text: "I want to grade homework assignments efficiently.",
    isUser: true,
  },
  {
    id: "bot1",
    text: "Great! I found some tools that might be perfect for what you're working on:",
    isUser: false,
    suggestions: [
      {
        id: "homework-helper",
        title: "Homework Assistant",
        description: "Create and grade homework assignments",
        icon: "📝",
        relevanceScore: 30,
      },
      {
        id: "smart-grading",
        title: "AI-Powered Grading Suite",
        description: "Comprehensive grading with detailed feedback",
        icon: "🎯",
        relevanceScore: 25,
      },
    ],
  },
  {
    id: "user2",
    text: "Can you help me track student engagement too?",
    isUser: true,
  },
  {
    id: "bot2",
    text: "Excellent! I have some suggestions that should make your work easier:",
    isUser: false,
    suggestions: [
      {
        id: "engagement-tracker",
        title: "Student Engagement Analytics",
        description: "Track and improve student participation",
        icon: "📊",
        relevanceScore: 30,
      },
    ],
  },
];

const TeachingAssistantBot = ({
  demoMode = false,
}: TeachingAssistantBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    demoMode
      ? DEMO_CONVERSATION
      : [
          {
            id: "welcome",
            text: "Hi! I'm your teaching assistant. What are you working on today? I can help you find the perfect tools for your tasks!\n\nWhat can this chatbot do? Ask me about lesson planning, grading, student engagement, or finding the right tools for your teaching tasks. I can recommend features, guide you to workflows, and help you get the most out of this platform!",
            isUser: false,
          },
        ]
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock tool database - in a real app, this would come from your backend
  const toolDatabase = [
    {
      id: "quiz-generator",
      title: "Simple Quiz Maker",
      description: "Generate quick assessments from your content",
      icon: "✅",
      keywords: [
        "quiz",
        "test",
        "assessment",
        "questions",
        "exam",
        "evaluate",
        "check understanding",
      ],
      category: "assessment",
    },
    {
      id: "lesson-plan-basic",
      title: "Quick Lesson Planner",
      description: "Create structured lesson plans in minutes",
      icon: "📋",
      keywords: [
        "lesson",
        "plan",
        "teaching",
        "curriculum",
        "structure",
        "objectives",
        "activities",
      ],
      category: "planning",
    },
    {
      id: "homework-helper",
      title: "Homework Assistant",
      description: "Create and grade homework assignments",
      icon: "📝",
      keywords: [
        "homework",
        "assignment",
        "practice",
        "exercises",
        "tasks",
        "grade",
        "feedback",
      ],
      category: "assignment",
    },
    {
      id: "smart-grading",
      title: "AI-Powered Grading Suite",
      description: "Comprehensive grading with detailed feedback",
      icon: "🎯",
      keywords: [
        "grading",
        "feedback",
        "rubric",
        "assessment",
        "evaluate",
        "score",
        "mark",
      ],
      category: "grading",
    },
    {
      id: "engagement-tracker",
      title: "Student Engagement Analytics",
      description: "Track and improve student participation",
      icon: "📊",
      keywords: [
        "engagement",
        "participation",
        "analytics",
        "tracking",
        "behavior",
        "attention",
      ],
      category: "analytics",
    },
    {
      id: "differentiation-pack",
      title: "Differentiation Toolkit",
      description: "Adapt content for all learning styles",
      icon: "🔄",
      keywords: [
        "differentiation",
        "adaptation",
        "learning styles",
        "special needs",
        "accommodate",
        "modify",
      ],
      category: "adaptation",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantTools = (userMessage: string): ToolSuggestion[] => {
    const message = userMessage.toLowerCase();
    const suggestions: ToolSuggestion[] = [];

    toolDatabase.forEach((tool) => {
      let relevanceScore = 0;

      // Check for keyword matches
      tool.keywords.forEach((keyword) => {
        if (message.includes(keyword.toLowerCase())) {
          relevanceScore += 10;
        }
      });

      // Check for partial matches
      tool.keywords.forEach((keyword) => {
        const words = message.split(" ");
        words.forEach((word) => {
          if (word.length > 3 && keyword.toLowerCase().includes(word)) {
            relevanceScore += 5;
          }
        });
      });

      // Boost score for exact title matches
      if (message.includes(tool.title.toLowerCase())) {
        relevanceScore += 20;
      }

      if (relevanceScore > 0) {
        suggestions.push({
          id: tool.id,
          title: tool.title,
          description: tool.description,
          icon: tool.icon,
          relevanceScore,
        });
      }
    });

    // Sort by relevance and return top 3
    return suggestions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  };

  const generateResponse = (
    userMessage: string,
    suggestions: ToolSuggestion[]
  ): string => {
    if (suggestions.length === 0) {
      return "I understand you're working on something interesting! While I couldn't find specific tools for that exact task, you might want to check out our dashboard for all available tools. Is there anything else I can help you find?";
    }

    const responses = [
      `Great! I found some tools that might be perfect for what you're working on:`,
      `Perfect! Here are some tools that could help with your task:`,
      `Excellent! I have some suggestions that should make your work easier:`,
      `Wonderful! Let me recommend some tools for what you're planning:`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const suggestions = findRelevantTools(inputValue);
      const responseText = generateResponse(inputValue, suggestions);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleToolClick = (toolId: string) => {
    navigate(`/workflow/${toolId}`);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant hover:shadow-lg transition-all duration-200 z-50 bg-gradient-primary"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-elegant z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-primary text-white rounded-t-lg">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Teaching Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Introductory message for teachers */}

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px] min-h-[100px] scrollbar-thin scrollbar-thumb-muted-foreground/40 scrollbar-track-muted/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`rounded-lg px-3 py-2 text-sm break-words whitespace-pre-line overflow-x-auto max-w-full`}
                        style={{
                          wordBreak: "break-word",
                          backgroundColor: message.isUser
                            ? "#f5f5f5"
                            : "#C89978",
                          color: message.isUser ? "#222" : "#fff",
                        }}
                      >
                        {message.text}
                      </div>

                      {/* Tool Suggestions */}
                      {message.suggestions &&
                        message.suggestions.length > 0 && (
                          <div className="space-y-2">
                            {message.suggestions.map((suggestion) => (
                              <div
                                key={suggestion.id}
                                className="border rounded-lg p-3 bg-card cursor-pointer hover:bg-muted/50 transition-colors overflow-x-auto max-w-full"
                                style={{ wordBreak: "break-word" }}
                                onClick={() => handleToolClick(suggestion.id)}
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-lg">
                                    {suggestion.icon}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4
                                        className="font-medium text-sm text-foreground break-words"
                                        style={{ wordBreak: "break-word" }}
                                      >
                                        {suggestion.title}
                                      </h4>
                                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                    <p
                                      className="text-xs text-muted-foreground mt-1 break-words"
                                      style={{ wordBreak: "break-word" }}
                                    >
                                      {suggestion.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What are you working on today?"
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TeachingAssistantBot;
