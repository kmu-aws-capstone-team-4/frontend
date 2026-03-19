import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { PageHeader, CheckItem } from '@/shared/ui/WireframeComps';

export const InterviewSetupForm = ({ onStart }: { onStart?: (settings: Record<string, unknown>) => void }) => {
  const [selectedResume, setSelectedResume] = useState('r1');
  const [interviewType, setInterviewType] = useState('tail'); // 'tail' or 'full'
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/interviews/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: selectedResume, type: interviewType })
      });
      if (res.ok) {
        const data = await res.json();
        onStart?.(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto gap-8 pt-6">
      <div className="text-center flex flex-col items-center gap-2">
        <PageHeader title="모의 면접 환경 설정" desc="사용할 이력서를 선택하고 장비가 정상 작동하는지 확인합니다." />
      </div>
      
      <div className="flex w-full justify-between items-center gap-4">
        <CheckItem 
          icon="📷" 
          title="카메라" 
          desc="카메라가 정상적으로 감지되었습니다" 
          status="통과" 
        />
        <CheckItem 
          icon="🎙️" 
          title="마이크" 
          desc="마이크가 정상적으로 입력되고 있습니다" 
          status="통과" 
        />
      </div>

      <Card className="p-8 w-full border border-border shadow-sm">
        <form onSubmit={handleStart} className="flex flex-col gap-8">
          <Select
            label="면접 기반 문서 선택 (이력서)"
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
            options={[
              { value: 'r1', label: '시니어 프론트엔드 포트폴리오 (2025.03)' },
              { value: 'r2', label: '신입 백엔드 이력서' },
              { value: 'none', label: '기본 인성 면접 (이력서 없음)' },
            ]}
          />
          
          <Select
            label="면접 진행 방식"
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
            options={[
              { value: 'tail', label: '심층 꼬리질문 위주 모의 면접 (30분)' },
              { value: 'full', label: '일반적인 전체 프로세스 면접 (60분)' },
            ]}
          />

          <Button type="submit" size="lg" disabled={isLoading} className="mt-4 bg-accent text-white rounded-lg h-12 w-full text-[15px] font-bold">
            {isLoading ? '면접 환경 준비 중...' : '모의 면접 시작하기'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
