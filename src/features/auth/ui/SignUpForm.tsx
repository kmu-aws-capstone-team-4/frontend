import { useState } from 'react';
import { useToast } from '../../../shared/ui/Toast';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast({ type: 'error', title: '검증 오류', message: '비밀번호가 일치하지 않습니다.' });
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
        addToast({ type: 'success', title: '가입 성공', message: '이메일 인증을 진행해주세요.' });
        navigate('/verify-email');
      } else {
        addToast({ type: 'error', title: '가입 실패', message: '계정을 생성할 수 없습니다.' });
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
          placeholder="비밀번호를 생성하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-text-primary font-inter text-[13px] font-semibold">비밀번호 확인</label>
        <input
          type="password"
          className="h-12 px-4 rounded-[10px] border border-border bg-card-bg text-text-primary placeholder:text-text-muted text-[14px] font-inter focus:outline-none focus:border-accent transition-colors"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-[52px] bg-accent hover:bg-orange-600 transition-colors text-white font-inter text-[16px] font-semibold rounded-[10px] shadow-[0_4px_14px_rgba(249,115,22,0.25)] w-full"
      >
        {isLoading ? '가입 처리 중...' : '회원가입'}
      </button>
    </form>
  );
};
