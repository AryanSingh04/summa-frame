import { useState } from 'react';
import { VideoUpload } from '@/components/VideoUpload';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AIResults } from '@/components/AIResults';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Video, Sparkles, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-video-ai.jpg';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    title: string;
    summary: string;
  } | null>(null);

  const handleVideoSelect = async (file: File) => {
    setSelectedVideo(file);
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

  const handleRegenerate = () => {
    if (!selectedVideo) return;
    
    setIsProcessing(true);
    
    // Simulate regeneration with different content
    setTimeout(() => {
      setResults({
        title: "AI-Powered Video Intelligence: The Future of Content Analysis",
        summary: `An in-depth exploration of cutting-edge video analysis technology powered by deep learning algorithms. This comprehensive overview demonstrates how artificial intelligence is reshaping our approach to video content understanding and automated summarization.

Featured technologies:
• Convolutional Neural Networks for visual pattern recognition
• Transformer architectures for sequence modeling
• Multi-modal learning combining visual and audio data
• Attention mechanisms for identifying key moments

The video provides insights into real-world applications including automated video editing, content moderation, accessibility features, and intelligent video search capabilities.`
      });
      setIsProcessing(false);
    }, 2500);
  };

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
          
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
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
              isProcessing={isProcessing}
            />
            
            {selectedVideo && (
              <VideoPlayer videoFile={selectedVideo} />
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
            
            {!selectedVideo && !isProcessing && (
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