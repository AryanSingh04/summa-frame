
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
    setIsProcessing(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://aryansingh04-summarizer.hf.space/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from backend:', errorData);
        alert('Failed to process video: ' + (errorData.error || 'Unknown error'));
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      setResults({ title: data.title, summary: data.summary });
    } catch (err) {
      console.error('Error sending video:', err);
      alert('Failed to send video to backend.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleYoutubeSubmit = async (url: string) => {
  setYoutubeUrl(url);
  setSelectedVideo(null);
  setIsProcessing(true);
  setResults(null);

  try {
    const response = await fetch("https://aryansingh04-summarizer.hf.space/transcribe-youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from backend:", errorData);
      alert("Failed to process YouTube video: " + (errorData.error || "Unknown error"));
      setIsProcessing(false);
      return;
    }

    const data = await response.json();
    setResults({ title: data.title, summary: data.summary });
  } catch (err) {
    console.error("Error sending YouTube URL:", err);
    alert("Failed to send YouTube URL to backend.");
  } finally {
    setIsProcessing(false);
  }
};

  const handleRegenerate = async() => {
       if (!selectedVideo && !youtubeUrl) return;
    setIsProcessing(true);
    // Simply resend the same video for regeneration
    if(selectedVideo) await handleVideoSelect(selectedVideo);
    if(youtubeUrl) await handleYoutubeSubmit(youtubeUrl);
    
    // Simulate regeneration with different content
    
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
