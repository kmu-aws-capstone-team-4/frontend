import { useState } from 'react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { useAuth } from '../model/useAuth';
import { useToast } from '../../../shared/ui/Toast';

export const LoginForm = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuth((state) => state.login);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        login(data.user, data.token);
        addToast({ type: 'success', title: 'Welcome!', message: 'Logged in successfully.' });
      } else {
        addToast({ type: 'error', title: 'Login Failed', message: 'Invalid credentials.' });
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
        placeholder="Enter your password"
        required
      />
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};
