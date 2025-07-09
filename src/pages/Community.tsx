import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share, 
  Star, 
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Filter,
  Search,
  ThumbsUp
} from "lucide-react";

// Mock community data
const communityPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    role: "7th Grade Science Teacher",
    title: "Game-changing Chemistry Lab Workflows",
    content: "I've been using the Chemistry Lab Assistant for 3 weeks now and it's transformed how I prepare experiments. Students are 40% more engaged and lab reports improved dramatically!",
    workflow: "Chemistry Lab Assistant",
    likes: 24,
    comments: 8,
    shares: 5,
    timeAgo: "2 hours ago",
    tags: ["Science", "Lab Work", "Engagement"]
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    role: "6th Grade Math Teacher",
    title: "Differentiation Made Simple",
    content: "The Math Differentiation Pack saved me 5 hours last week! I can now create 3 different versions of the same assignment in minutes. My struggling students finally feel confident.",
    workflow: "Math Differentiation Pack",
    likes: 31,
    comments: 12,
    shares: 8,
    timeAgo: "5 hours ago",
    tags: ["Math", "Differentiation", "Time-Saving"]
  },
  {
    id: 3,
    author: "Lisa Thompson",
    role: "8th Grade English Teacher", 
    title: "Parent Communication Breakthrough",
    content: "The Parent Communication Hub helped me turn around a difficult parent situation. The AI-suggested language was perfect - professional but warm. Highly recommend!",
    workflow: "Parent Communication Hub",
    likes: 18,
    comments: 6,
    shares: 3,
    timeAgo: "1 day ago",
    tags: ["Communication", "Parent Relations", "Professional Development"]
  },
  {
    id: 4,
    author: "David Kim",
    role: "Middle School Principal",
    title: "School-wide Implementation Success Story",
    content: "We rolled out GoodClass tools to all our middle school teachers. 3 months later: 25% reduction in grading time, 15% increase in student engagement scores. The data speaks for itself!",
    workflow: "Multiple Tools",
    likes: 45,
    comments: 18,
    shares: 12,
    timeAgo: "2 days ago",
    tags: ["Leadership", "Implementation", "Data-Driven", "Success Story"],
    isPinned: true
  }
];

const discussionTopics = [
  {
    id: 1,
    title: "Best practices for AI grading in middle school",
    replies: 24,
    lastActive: "30 min ago",
    isHot: true
  },
  {
    id: 2,
    title: "Differentiation strategies that actually work",
    replies: 18,
    lastActive: "2 hours ago"
  },
  {
    id: 3,
    title: "Parent communication templates - share yours!",
    replies: 12,
    lastActive: "4 hours ago"
  },
  {
    id: 4,
    title: "How to introduce AI tools to reluctant colleagues",
    replies: 8,
    lastActive: "6 hours ago"
  }
];

const topContributors = [
  { name: "Maria Santos", posts: 42, likes: 234, badge: "Top Helper" },
  { name: "James Wilson", posts: 38, likes: 198, badge: "AI Expert" },
  { name: "Chen Wei", posts: 35, likes: 187, badge: "Innovation Leader" },
  { name: "Anna Garcia", posts: 29, likes: 156, badge: "Community Star" }
];

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("success-stories");
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const tabs = [
    { id: "success-stories", label: "Success Stories", icon: Award },
    { id: "discussions", label: "Discussions", icon: MessageCircle },
    { id: "q-and-a", label: "Q&A", icon: BookOpen },
    { id: "feedback", label: "Feedback", icon: ThumbsUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Teacher Community</h1>
                <p className="text-muted-foreground">Connect, share, and learn from fellow educators</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>12,847 active teachers</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={activeTab === tab.id ? "bg-primary text-primary-foreground" : ""}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Success Stories Tab */}
            {activeTab === "success-stories" && (
              <div className="space-y-6">
                {/* Share Your Story */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Share Your Success Story</CardTitle>
                    <CardDescription>Help other teachers by sharing how AI tools have improved your teaching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Tell us about a time when an AI tool made a real difference in your classroom..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-20 mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant="outline">Add Tags</Badge>
                        <Badge variant="outline">Select Workflow</Badge>
                      </div>
                      <Button 
                        disabled={!newPost.trim()}
                        className="bg-gradient-primary"
                      >
                        Share Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                <div className="space-y-6">
                  {communityPosts.map((post) => (
                    <Card key={post.id} className={post.isPinned ? "ring-2 ring-primary" : ""}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">{post.author}</h3>
                                {post.isPinned && <Badge className="bg-gradient-primary">Pinned</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{post.role}</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold text-foreground mb-2">{post.title}</h4>
                        <p className="text-foreground mb-4">{post.content}</p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="text-primary border-primary">
                            {post.workflow}
                          </Badge>
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={likedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground"}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Share className="w-4 h-4 mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Thread
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === "discussions" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Active Discussions
                    </CardTitle>
                    <CardDescription>Join ongoing conversations with fellow teachers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {discussionTopics.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer">
                          <div className="flex items-center gap-3">
                            {topic.isHot && <Badge className="bg-red-500">Hot</Badge>}
                            <h4 className="font-medium text-foreground">{topic.title}</h4>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {topic.replies} replies • {topic.lastActive}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "q-and-a" && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Q&A Coming Soon</h3>
                <p className="text-muted-foreground">Expert answers to your teaching questions</p>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === "feedback" && (
              <div className="text-center py-12">
                <ThumbsUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Feedback Hub Coming Soon</h3>
                <p className="text-muted-foreground">Share your thoughts and help improve our tools</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{contributor.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{contributor.badge}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {contributor.posts} posts • {contributor.likes} likes
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">89%</p>
                  <p className="text-sm text-muted-foreground">Report improved teaching efficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">4.2 hrs</p>
                  <p className="text-sm text-muted-foreground">Average time saved weekly</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">12,847</p>
                  <p className="text-sm text-muted-foreground">Active teachers</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Search Posts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Subject
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  My Saved Posts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;