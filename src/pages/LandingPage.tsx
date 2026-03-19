import { Link } from 'react-router-dom';
import { Button } from '../shared/ui/Button';
import { Typography } from '../shared/ui/Typography';

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center">
      <Typography variant="h1" weight="bold">AI Mock Interviews, Everyday</Typography>
      <Typography variant="subtitle" color="secondary" className="max-w-xl">
        Improve your interview skills with tailored, contextual questions based on your resume. Get started today.
      </Typography>
      <Link to="/signup">
        <Button size="lg" className="mt-8 px-12">Start for Free</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
