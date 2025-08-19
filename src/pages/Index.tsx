
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoUpload } from '@/components/VideoUpload';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AIResults } from '@/components/AIResults';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Brain, Video, Sparkles, Zap, User, LogOut } from 'lucide-react';
import heroImage from '@/assets/hero-video-ai.jpg';

const Index = () => {
  const { user, session, loading, isDemoMode, signOut, exitDemoMode } = useAuth();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    title: string;
    summary: string;
  } | null>(null);
  
  const isAuthenticated = !!user || isDemoMode;

  const handleVideoSelect = async (file: File) => {
    setSelectedVideo(file);
    setYoutubeUrl(null);
    setIsProcessing(true);
    setResults(null);

    // Simulate AI processing
    setTimeout(() => {
      setResults({
        title: "Revolutionary AI Technology Breakthrough: Deep Learning Transforms Video Analysis",
        summary: `This video showcases groundbreaking advances in artificial intelligence and deep learning technology. The content explores how neural networks are revolutionizing video analysis, enabling automated content understanding and intelligent summarization.

Key highlights include:
• Advanced computer vision algorithms that can identify objects, scenes, and actions
• Natural language processing capabilities for generating human-like descriptions
• Real-time video processing with unprecedented accuracy
• Applications in content creation, education, and media analysis

The video demonstrates the practical implementation of these technologies and their potential impact on various industries, from entertainment to scientific research.`
      });
      setIsProcessing(false);
    }, 3000);
  };

  const handleYoutubeSubmit = async (url: string) => {
    setYoutubeUrl(url);
    setSelectedVideo(null);
    setIsProcessing(true);
    setResults(null);

    // Simulate AI processing for YouTube video
    setTimeout(() => {
      setResults({
        title: "AI-Powered Video Intelligence: YouTube Content Analysis Revolution",
        summary: `This YouTube video demonstrates cutting-edge AI technology for automated video content analysis. The deep learning algorithms process visual and audio data to understand context, themes, and key information.

Analysis highlights:
• Multi-modal AI processing combining visual, audio, and text data
• Real-time content categorization and topic identification
• Automated highlight detection and key moment extraction
• Cross-platform video intelligence capabilities

The technology showcased represents the next generation of content understanding systems, enabling creators and platforms to automatically generate meaningful insights from video content at scale.`
      });
      setIsProcessing(false);
    }, 3500);
  };

  const handleRegenerate = () => {
    if (!selectedVideo && !youtubeUrl) return;
    
    setIsProcessing(true);
    
    // Simulate regeneration with different content
    setTimeout(() => {
      setResults({
        title: selectedVideo ? "Deep Learning Video Analysis: Advanced AI Content Processing" : "YouTube AI Analysis: Smart Content Understanding Technology",
        summary: selectedVideo ? 
          `An in-depth exploration of cutting-edge video analysis technology powered by deep learning algorithms. This comprehensive overview demonstrates how artificial intelligence is reshaping our approach to video content understanding and automated summarization.

Featured technologies:
• Convolutional Neural Networks for visual pattern recognition
• Transformer architectures for sequence modeling
• Multi-modal learning combining visual and audio data
• Attention mechanisms for identifying key moments

The video provides insights into real-world applications including automated video editing, content moderation, accessibility features, and intelligent video search capabilities.` :
          `This YouTube content showcases advanced AI algorithms designed for comprehensive video analysis and understanding. The technology demonstrates sophisticated pattern recognition and content extraction capabilities.

Key features:
• Advanced neural network architectures for video processing
• Semantic understanding of visual and contextual elements
• Automated content summarization and key insight extraction
• Platform-agnostic video intelligence solutions

The demonstrated AI systems represent breakthrough capabilities in automated content analysis, offering unprecedented accuracy in video understanding and summary generation.`
      });
      setIsProcessing(false);
    }, 2500);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleExitDemo = () => {
    exitDemoMode();
    navigate('/auth');
  };

  // Redirect to auth if not authenticated and not loading
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">VideoAI</h1>
              <p className="text-sm text-muted-foreground">Deep Learning Video Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
            
            {isDemoMode ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExitDemo}
                className="border-muted-foreground text-muted-foreground hover:bg-muted"
              >
                <User className="h-4 w-4 mr-2" />
                Exit Demo
              </Button>
            ) : user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-muted-foreground text-muted-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Analysis
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Transform Videos into
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Intelligence</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload any video and let our advanced deep learning algorithms automatically generate compelling titles and comprehensive summaries in seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Deep Learning Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Multiple Formats</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl blur-3xl"></div>
            <img
              src={heroImage}
              alt="AI Video Analysis Technology"
              className="relative rounded-2xl shadow-glass w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Video */}
          <div className="space-y-6">
            <VideoUpload 
              onVideoSelect={handleVideoSelect}
              onYoutubeSubmit={handleYoutubeSubmit}
              isProcessing={isProcessing}
            />
            
            {selectedVideo && (
              <VideoPlayer videoFile={selectedVideo} />
            )}
            
            {youtubeUrl && (
              <VideoPlayer youtubeUrl={youtubeUrl} />
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {(results || isProcessing) && (
              <AIResults
                title={results?.title || ''}
                summary={results?.summary || ''}
                isGenerating={isProcessing}
                onRegenerate={handleRegenerate}
              />
            )}
            
            {!selectedVideo && !youtubeUrl && !isProcessing && (
              <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
                <div className="p-8 text-center">
                  <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready to analyze your video?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Upload a video file to get started with AI-powered analysis. Our deep learning models will generate an engaging title and comprehensive summary.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Advanced neural network analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span>Context-aware content understanding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>Lightning-fast processing</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-border/50">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            Powered by advanced deep learning algorithms • Built with ❤️ for the future of video analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
