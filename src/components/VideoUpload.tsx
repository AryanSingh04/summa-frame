import { useCallback, useState } from 'react';
import { Upload, Video, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  isProcessing: boolean;
}

export const VideoUpload = ({ onVideoSelect, isProcessing }: VideoUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

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

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 border-dashed transition-all duration-300",
      "bg-gradient-card backdrop-blur-sm",
      isDragOver ? "border-primary shadow-glow-primary" : "border-border",
      isProcessing && "opacity-50 cursor-not-allowed"
    )}>
      <div
        className="p-12 text-center"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {isProcessing ? (
          <div className="space-y-4">
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
        ) : (
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
        )}
        
        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
      </div>
    </Card>
  );
};