import { Typography } from '@/shared/ui/Typography';
import { ResumeList, ResumeUploadForm } from '@/features/resume';

export const ResumePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h2" weight="bold">Resume Management</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="flex flex-col gap-4">
          <Typography variant="h4" weight="semibold">My Resumes</Typography>
          <ResumeList />
        </section>
        <section className="flex flex-col gap-4">
          <Typography variant="h4" weight="semibold">Upload New Resume</Typography>
          <ResumeUploadForm onSuccess={() => window.location.reload()} />
        </section>
      </div>
    </div>
  );
};
