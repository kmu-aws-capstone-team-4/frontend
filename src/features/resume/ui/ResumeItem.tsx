export interface ResumeItemProps {
  title: string;
  type?: string;
  date?: string;
  meta?: string;
  active?: boolean;
  isDefault?: boolean;
}

export const ResumeItem = ({ title, type, date, meta, active, isDefault }: ResumeItemProps) => {
  return (
    <div className={`flex items-center justify-between px-5 py-4 bg-card-bg border border-border rounded-xl w-full ${!active ? 'opacity-60' : ''}`}>
      <div className="flex flex-col gap-1">
        <span className="text-text-primary font-inter text-[15px] font-semibold">{title}</span>
        <span className="text-text-muted font-inter text-[13px] font-medium">
          {type && date ? `${type} • ${date}` : meta}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {active && (
          <div className="flex items-center px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[12px] font-semibold">
            분석 완료
          </div>
        )}
        {isDefault && (
          <div className="flex items-center px-2.5 py-1 gap-1.5 rounded-full bg-[#DCFCE7] border border-[#16A34A] text-[#16A34A] text-[12px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
            기본 설정됨
          </div>
        )}
      </div>
    </div>
  );
};

