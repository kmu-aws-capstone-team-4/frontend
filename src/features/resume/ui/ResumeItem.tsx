export const ResumeItem = ({ title, meta }: { title: string; meta: string }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-card-bg border border-border rounded-xl w-full max-w-[800px]">
      <div className="flex flex-col gap-1">
        <span className="text-text-primary font-inter text-[14px] font-semibold">{title}</span>
        <span className="text-text-muted font-inter text-[12px] font-normal">{meta}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[12px] font-semibold">
          분석 완료
        </div>
        <div className="flex items-center px-2 py-1 gap-1.5 rounded-full bg-[#DCFCE7] border border-[#16A34A] text-[#16A34A] text-[12px] font-semibold cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
          기본 설정됨
        </div>
      </div>
    </div>
  );
};
