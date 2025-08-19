import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Play, Youtube } from 'lucide-react';

interface VideoPlayerProps {
  videoFile?: File;
  youtubeUrl?: string;
}

export const VideoPlayer = ({ videoFile, youtubeUrl }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Extract YouTube video ID from URL (supports regular videos and shorts)
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  
  let videoUrl = '';
  if (videoFile) {
    videoUrl = URL.createObjectURL(videoFile);
  }

  useEffect(() => {
    if (videoFile) {
      return () => {
        URL.revokeObjectURL(videoUrl);
      };
    }
  }, [videoUrl, videoFile]);

  return (
    <Card className="overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          {youtubeUrl ? (
            <>
              <Youtube className="h-5 w-5 mr-2 text-red-500" />
              YouTube Video
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2 text-primary" />
              Video Preview
            </>
          )}
        </h3>
        
        <div className="relative rounded-lg overflow-hidden bg-black/20">
          {youtubeUrl && embedUrl ? (
            <iframe
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video"
              style={{ maxHeight: '400px' }}
            />
          ) : videoFile ? (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full aspect-video object-cover"
              style={{ maxHeight: '400px' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
        
        <div className="mt-3 text-sm text-muted-foreground">
          {videoFile ? (
            <>
              <p>File: {videoFile.name}</p>
              <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </>
          ) : youtubeUrl ? (
            <p className="font-mono truncate">URL: {youtubeUrl}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
};