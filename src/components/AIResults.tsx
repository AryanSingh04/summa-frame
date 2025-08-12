import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, RefreshCw, Type, FileText } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AIResultsProps {
  title: string;
  summary: string;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export const AIResults = ({ title, summary, isGenerating, onRegenerate }: AIResultsProps) => {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: 'title' | 'summary') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'title') {
        setCopiedTitle(true);
        setTimeout(() => setCopiedTitle(false), 2000);
      } else {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      }
      toast({
        title: `${type === 'title' ? 'Title' : 'Summary'} copied!`,
        description: "Content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (isGenerating) {
    return (
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="p-6 text-center">
          <div className="relative mb-4">
            <Sparkles className="h-12 w-12 mx-auto text-primary animate-pulse" />
            <div className="absolute inset-0 h-12 w-12 mx-auto rounded-full bg-primary/20 animate-ping" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            AI is working its magic...
          </h3>
          <p className="text-muted-foreground">
            Analyzing video content and generating insights
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generated Title */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">AI Generated Title</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(title, 'title')}
                className="border-border/50 hover:bg-accent/50"
              >
                <Copy className="h-4 w-4" />
                {copiedTitle ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          
          <div className="bg-accent/20 rounded-lg p-4 border border-accent/30">
            <p className="text-foreground font-medium text-lg leading-relaxed">
              {title}
            </p>
          </div>
        </div>
      </Card>

      {/* Generated Summary */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">AI Generated Summary</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(summary, 'summary')}
                className="border-border/50 hover:bg-accent/50"
              >
                <Copy className="h-4 w-4" />
                {copiedSummary ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          
          <div className="bg-accent/20 rounded-lg p-4 border border-accent/30">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
        </div>
      </Card>

      {/* Regenerate Button */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="p-4 text-center">
          <Button
            onClick={onRegenerate}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate with AI
          </Button>
        </div>
      </Card>
    </div>
  );
};