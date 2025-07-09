
// Mock data for the prototype
export const workflows = {
  beginner: [
    {
      id: "lesson-plan-basic",
      title: "Quick Lesson Planner",
      description: "Create structured lesson plans in minutes",
      icon: "📋",
      difficulty: "Beginner",
      time: "5 min",
      rating: 4.8,
      users: 1240
    },
    {
      id: "quiz-generator",
      title: "Simple Quiz Maker",
      description: "Generate quick assessments from your content",
      icon: "✅",
      difficulty: "Beginner", 
      time: "3 min",
      rating: 4.7,
      users: 980
    },
    {
      id: "homework-helper",
      title: "Homework Assistant",
      description: "Create and grade homework assignments",
      icon: "📝",
      difficulty: "Beginner",
      time: "8 min", 
      rating: 4.6,
      users: 760
    }
  ],
  topPicks: [
    {
      id: "smart-grading",
      title: "AI-Powered Grading Suite",
      description: "Comprehensive grading with detailed feedback",
      icon: "🎯",
      difficulty: "Intermediate",
      time: "10 min",
      rating: 4.9,
      users: 2100,
      isRecommended: true
    },
    {
      id: "engagement-tracker",
      title: "Student Engagement Analytics",
      description: "Track and improve student participation",
      icon: "📊", 
      difficulty: "Advanced",
      time: "15 min",
      rating: 4.8,
      users: 1850
    },
    {
      id: "differentiation-pack",
      title: "Differentiation Toolkit",
      description: "Adapt content for all learning styles",
      icon: "🔄",
      difficulty: "Intermediate",
      time: "12 min",
      rating: 4.9,
      users: 1920
    }
  ],
  subjectPacks: [
    {
      id: "science-pack",
      title: "Middle School Science RAG Pack",
      description: "Complete science teaching workflows",
      subjects: ["Science"],
      icon: "🔬",
      tools: 8,
      rating: 4.9,
      users: 890
    },
    {
      id: "english-pack", 
      title: "ELA Writing & Reading Suite",
      description: "Comprehensive language arts tools",
      subjects: ["English"],
      icon: "📚",
      tools: 12,
      rating: 4.8,
      users: 1200
    },
    {
      id: "math-pack",
      title: "Interactive Math Workbench", 
      description: "Problem solving and assessment tools",
      subjects: ["Math"],
      icon: "🔢",
      tools: 10,
      rating: 4.7,
      users: 1050
    }
  ],
  community: [
    {
      id: "peer-review",
      title: "Peer Review Workshop",
      description: "Collaborative lesson planning with colleagues",
      icon: "👥",
      difficulty: "Intermediate",
      time: "20 min",
      rating: 4.8,
      users: 650,
      isNew: true
    },
    {
      id: "parent-communication",
      title: "Parent Communication Hub",
      description: "Streamline parent-teacher interactions",
      icon: "💬",
      difficulty: "Beginner",
      time: "5 min", 
      rating: 4.6,
      users: 820
    }
  ]
};
