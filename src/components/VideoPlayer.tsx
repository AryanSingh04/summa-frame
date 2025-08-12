import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoFile: File;
}

export const VideoPlayer = ({ videoFile }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = URL.createObjectURL(videoFile);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <Card className="overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Play className="h-5 w-5 mr-2 text-primary" />
          Video Preview
        </h3>
        
        <div className="relative rounded-lg overflow-hidden bg-black/20">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full aspect-video object-cover"
            style={{ maxHeight: '400px' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="mt-3 text-sm text-muted-foreground">
          <p>File: {videoFile.name}</p>
          <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      </div>
    </Card>
  );
};