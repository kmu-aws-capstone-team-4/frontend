import { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Input } from '../../../shared/ui/Input';
import { Textarea } from '../../../shared/ui/Textarea';
import { Button } from '../../../shared/ui/Button';
import { useToast } from '../../../shared/ui/Toast';
import { Typography } from '../../../shared/ui/Typography';
import { Icon } from '../../../shared/ui/Icon';
import { Upload } from 'lucide-react';

export const ResumeUploadForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [title, setTitle] = useState('');
  const [inputType, setInputType] = useState<'file' | 'text'>('file');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type: inputType, content })
      });
      if (res.ok) {
        addToast({ type: 'success', title: 'Uploaded!', message: 'Your resume is ready for analysis.' });
        onSuccess?.();
      }
    } catch {
      addToast({ type: 'error', message: 'Failed to upload resume.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Typography variant="h4" weight="semibold">Add Resume</Typography>
        
        <div className="flex gap-2 p-1 bg-muted-bg rounded-lg border border-border">
          <Button
            type="button"
            variant={inputType === 'file' ? 'primary' : 'text'}
            className="flex-1"
            onClick={() => setInputType('file')}
            size="sm"
          >
            File Upload
          </Button>
          <Button
            type="button"
            variant={inputType === 'text' ? 'primary' : 'text'}
            className="flex-1"
            onClick={() => setInputType('text')}
            size="sm"
          >
            Text Input
          </Button>
        </div>

        <Input
          label="Resume Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 2026 Frontend Resume"
          required
        />

        {inputType === 'file' ? (
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-muted-bg transition-colors cursor-pointer">
            <Icon icon={Upload} className="text-text-muted" size={32} />
            <Typography color="secondary" weight="medium">Click or drag file to upload</Typography>
            <Typography variant="caption" color="muted">PDF, DOCX up to 10MB</Typography>
          </div>
        ) : (
          <Textarea
            label="Resume Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your resume text or experience summary here..."
            rows={8}
            required
          />
        )}

        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? 'Uploading...' : 'Upload Resume'}
        </Button>
      </form>
    </Card>
  );
};
