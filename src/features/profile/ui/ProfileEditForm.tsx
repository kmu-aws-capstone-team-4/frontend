import { useState } from 'react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Avatar } from '../../../shared/ui/Avatar';
import { useToast } from '../../../shared/ui/Toast';
export const ProfileEditForm = () => {
  const [nickname, setNickname] = useState('TestUser');
  const [jobCategory, setJobCategory] = useState('Frontend Developer');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((res) => setTimeout(res, 800));
      addToast({ type: 'success', title: 'Profile Updated', message: 'Your changes have been saved.' });
    } catch {
      addToast({ type: 'error', message: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-md w-full">
      <div className="flex items-center gap-4">
        <Avatar size="xl" fallbackName={nickname} />
        <Button variant="outline" type="button">Change Avatar</Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Input
          label="Job Category"
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
};
