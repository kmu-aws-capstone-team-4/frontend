import { useState } from 'react';
import { useAuth } from '../model/useAuth';
import { useToast } from '../../../shared/ui/Toast';

export const LoginForm = () => {
  const [email, setEmail] = useState('hong@example.com');
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
        addToast({ type: 'success', title: '환영합니다!', message: '로그인에 성공했습니다.' });
      } else {
        addToast({ type: 'error', title: '로그인 실패', message: '이메일 또는 비밀번호를 확인해주세요.' });
      }
    } catch (err) {
      console.error(err);
      addToast({ type: 'error', title: '네트워크 오류', message: '서버에 연결할 수 없습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-text-primary font-inter text-[13px] font-semibold">이메일</label>
        <input
          type="email"
          className="h-12 px-4 rounded-[10px] border border-border bg-card-bg text-text-primary placeholder:text-text-muted text-[14px] font-inter focus:outline-none focus:border-accent transition-colors"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-text-primary font-inter text-[13px] font-semibold">비밀번호</label>
        <input
          type="password"
          className="h-12 px-4 rounded-[10px] border border-border bg-card-bg text-text-primary placeholder:text-text-muted text-[14px] font-inter focus:outline-none focus:border-accent transition-colors"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-[52px] bg-accent hover:bg-orange-600 transition-colors text-white font-inter text-[16px] font-semibold rounded-[10px] shadow-[0_4px_14px_rgba(249,115,22,0.25)] w-full"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};
