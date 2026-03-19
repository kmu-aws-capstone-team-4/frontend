import { useState } from 'react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { useToast } from '../../../shared/ui/Toast';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        addToast({ type: 'success', title: 'Account Created', message: 'Please log in to continue.' });
        // Can route to login page here if a router is available
      } else {
        addToast({ type: 'error', title: 'Sign Up Failed', message: 'Could not create account.' });
      }
    } catch (err) {
      console.error(err);
      addToast({ type: 'error', title: 'Network Error', message: 'Could not connect to server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
};
