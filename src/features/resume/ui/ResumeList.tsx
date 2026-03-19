import { useEffect, useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Typography } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Button';

interface Resume {
  id: string;
  title: string;
  type: string;
  isActive: boolean;
  createdAt: string;
}

export const ResumeList = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resumes')
      .then(res => res.json())
      .then(data => {
        setResumes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading resumes...</Typography>;
  if (resumes.length === 0) return <Typography color="muted">No resumes found. Please upload one.</Typography>;

  return (
    <div className="flex flex-col gap-4">
      {resumes.map(resume => (
        <Card key={resume.id} className="p-4 flex items-center justify-between hover:bg-muted-bg transition-colors">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Typography weight="semibold">{resume.title}</Typography>
              {resume.isActive && <Badge variant="success">Active</Badge>}
              <Badge variant="outline">{resume.type}</Badge>
            </div>
            <Typography variant="caption" color="muted">
              Uploaded at {new Date(resume.createdAt).toLocaleDateString()}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            {!resume.isActive && <Button variant="text" size="sm">Set Active</Button>}
            <Button variant="outline" size="sm" className="text-error border-error hover:bg-red-50">Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
