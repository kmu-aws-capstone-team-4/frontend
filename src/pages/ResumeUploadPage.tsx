import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResumeUploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  // Mock file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto gap-8">
      <PageHeader 
        title="이력서 업로드" 
        subtitle="PDF, DOCX 형식의 이력서를 업로드하여 AI 분석을 받아보세요." 
        step={1} 
        totalSteps={2} 
      />

      <div className="flex flex-col gap-6 w-full px-4 md:px-0">
        {!file ? (
          <div 
            className="flex flex-col items-center justify-center gap-4 w-full h-[280px] rounded-2xl border-2 border-dashed border-accent-light bg-muted-bg hover:bg-orange-50/50 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => {
              // Mock file selection
              setFile(new File(['mock content'], 'my_resume.pdf', { type: 'application/pdf' }));
            }}
          >
            <div className="p-4 bg-white rounded-full shadow-sm text-accent">
              <Upload size={32} />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Typography variant="body" weight="semibold">파일을 이곳으로 드래그하거나 클릭하여 업로드하세요</Typography>
              <Typography variant="caption" className="text-text-secondary">지원 형식: PDF, DOCX (최대 10MB)</Typography>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-5 rounded-xl border border-border bg-card-bg w-full">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                <FileText size={24} />
              </div>
              <div className="flex flex-col">
                <Typography variant="body" weight="semibold">{file.name}</Typography>
                <Typography variant="caption" className="text-text-secondary">{(file.size / 1024).toFixed(1)} KB • 업로드 완료</Typography>
              </div>
            </div>
            <Button variant="text" className="text-red-500 hover:bg-red-50" onClick={() => setFile(null)}>
              <Trash2 size={18} />
            </Button>
          </div>
        )}

        {/* Submit Row */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => navigate('/resumes')} className="px-6 h-12 text-text-secondary">취소</Button>
          <Button variant="primary" disabled={!file} className="px-8 h-12 shadow-orange-400/30 shadow-lg" onClick={() => navigate('/resumes')}>
            분석 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};
