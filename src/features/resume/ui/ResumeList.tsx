import { useState, useEffect } from 'react';
import { ResumeItem } from '@/features/resume/ui/ResumeItem';
import { EmptyState } from '@/shared/ui/WireframeComps';

interface ResumeData {
  id: string;
  title: string;
  type: string;
  createdAt: string;
}

export const ResumeList = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  useEffect(() => {
    fetch('/api/resumes')
      .then(res => res.json())
      .then(data => setResumes(data))
      .catch(console.error);
  }, []);

  if (resumes.length === 0) {
    return (
      <EmptyState 
        icon="📭" 
        title="아직 항목이 없습니다" 
        desc="새 항목을 추가해보세요." 
        btnText="+ 추가하기"
        onAction={() => window.scrollTo(0, document.body.scrollHeight)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {resumes.map(r => (
        <ResumeItem 
          key={r.id} 
          title={r.title} 
          meta={`${r.type === 'file' ? '파일 업로드' : '직접 입력'} · 분석 완료 · ${new Date(r.createdAt).toLocaleDateString()}`}
        />
      ))}
    </div>
  );
};
