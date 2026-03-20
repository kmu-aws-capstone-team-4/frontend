import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Info } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl pb-10">
      <Typography variant="h3" weight="bold">설정</Typography>

      {/* Profile Card */}
      <div className="flex flex-col p-6 md:p-8 bg-white border border-[#E7E5E4] rounded-xl gap-6">
        <Typography variant="body" weight="semibold" className="text-lg border-b border-[#E7E5E4] pb-4">회원 정보 수정</Typography>
        <div className="flex flex-col gap-5 max-w-lg">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">이메일</label>
            <Input value="test@example.com" disabled className="bg-muted-bg" />
            <Typography variant="caption" className="text-text-muted mt-1">이메일은 변경할 수 없습니다.</Typography>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">이름</label>
            <Input defaultValue="사용자 이름" />
          </div>
          <Button variant="outline" className="w-fit px-6 mt-2">변경 사항 저장</Button>
        </div>
      </div>

      {/* Password Card */}
      <div className="flex flex-col p-6 md:p-8 bg-white border border-[#E7E5E4] rounded-xl gap-6">
        <Typography variant="body" weight="semibold" className="text-lg border-b border-[#E7E5E4] pb-4">비밀번호 변경</Typography>
        <div className="flex flex-col gap-5 max-w-lg">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">현재 비밀번호</label>
            <Input type="password" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">새 비밀번호</label>
            <Input type="password" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">새 비밀번호 확인</label>
            <Input type="password" />
          </div>
          <Button variant="outline" className="w-fit px-6 mt-2">비밀번호 변경</Button>
        </div>
      </div>

      {/* Privacy Card */}
      <div className="flex flex-col p-6 md:p-8 bg-white border border-[#E7E5E4] rounded-xl gap-6">
        <div className="flex flex-col gap-2 border-b border-[#E7E5E4] pb-4">
          <Typography variant="body" weight="semibold" className="text-lg">개인정보 및 약관</Typography>
          <Typography variant="caption" className="text-[#78716C] leading-snug">
            영상·음성 데이터의 AI 학습 활용에 대한 동의를 관리합니다. 동의를 거부해도 서비스 기본 이용은 가능합니다.
          </Typography>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium text-text-primary">마케팅 정보 수신 동의 (선택)</span>
            <div className="w-11 h-6 bg-accent rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-[2px] right-[2px] shadow-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium text-text-primary">AI 학습용 데이터 제공 동의 (선택)</span>
            <div className="w-11 h-6 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 md:p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg mt-2">
          <Info size={16} className="text-[#F97316] shrink-0" />
          <Typography variant="caption" className="text-[#C2410C]">
            약관 버전이 변경될 경우 재동의를 요청드립니다. 현재 약관 버전: v2.1
          </Typography>
        </div>
      </div>
    </div>
  );
};
