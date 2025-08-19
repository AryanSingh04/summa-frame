
import { useCallback, useState } from 'react';
import { Upload, Video, FileText, Sparkles, Youtube, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  onYoutubeSubmit: (url: string) => void;
  isProcessing: boolean;
}

export const VideoUpload = ({ onVideoSelect, onYoutubeSubmit, isProcessing }: VideoUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'youtube'>('file');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      onVideoSelect(videoFile);
    }
  }, [onVideoSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  }, [onVideoSelect]);

  const handleYoutubeSubmit = () => {
    if (youtubeUrl.trim()) {
      onYoutubeSubmit(youtubeUrl.trim());
      setYoutubeUrl('');
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 border-dashed transition-all duration-300",
      "bg-gradient-card backdrop-blur-sm",
      isDragOver && uploadMode === 'file' ? "border-primary shadow-glow-primary" : "border-border",
      isProcessing && "opacity-50 cursor-not-allowed"
    )}>
      <div className="p-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={uploadMode === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('file')}
            disabled={isProcessing}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button
            variant={uploadMode === 'youtube' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('youtube')}
            disabled={isProcessing}
          >
            <Youtube className="h-4 w-4 mr-2" />
            YouTube URL
          </Button>
        </div>

        {isProcessing ? (
          <div className="space-y-4 text-center py-8">
            <div className="relative">
              <Sparkles className="h-16 w-16 mx-auto text-primary animate-pulse" />
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full bg-primary/20 animate-ping" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI is analyzing your video...
              </h3>
              <p className="text-muted-foreground">
                Generating title and summary using deep learning
              </p>
            </div>
          </div>
        ) : uploadMode === 'file' ? (
          <div
            className="text-center py-8"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <div className="space-y-6">
              <div className="relative">
                <Upload className="h-16 w-16 mx-auto text-muted-foreground transition-colors group-hover:text-primary" />
                {isDragOver && (
                  <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full bg-primary/10 animate-pulse" />
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Upload your video
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop a video file or click to browse
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 shadow-glow-primary"
                    onClick={() => document.getElementById('video-input')?.click()}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Choose Video
                  </Button>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    MP4, AVI, MOV supported
                  </div>
                </div>
              </div>
            </div>
            
            <input
              id="video-input"
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
          </div>
        ) : (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="relative mb-6">
                <Youtube className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Enter YouTube URL
              </h3>
              <p className="text-muted-foreground mb-6">
                Paste a YouTube video link to analyze
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">YouTube Video URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="youtube-url"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="pl-10"
                      disabled={isProcessing}
                    />
                  </div>
                  <Button 
                    onClick={handleYoutubeSubmit}
                    disabled={!youtubeUrl.trim() || isProcessing}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    Analyze
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                Supports YouTube video URLs and shorts
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
