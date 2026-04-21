interface LinearPacerProps {
  value: number; // 0..1
  label?: string;
  weight?: string;
  showValue?: boolean;
}

export const LinearPacer = ({ value, label, weight, showValue = true }: LinearPacerProps) => {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="w-full">
      {(label || weight) && (
        <div className="mono mb-2 flex items-center justify-between">
          <span className="text-ink">{label}</span>
          <span>{weight}</span>
        </div>
      )}
      <div className="relative h-3 w-full bg-ash border border-ink">
        <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${pct}%` }} />
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-infrared"
          style={{ left: `calc(${pct}% - 1px)` }}
        />
      </div>
      {showValue && (
        <div className="mono-ink mt-1 text-right">{value.toFixed(2)}</div>
      )}
    </div>
  );
};
