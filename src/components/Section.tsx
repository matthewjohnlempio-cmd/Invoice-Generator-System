export default function Section({ title, icon, children }: any) {
  return (
    <div className="bg-[var(--surface)] p-5 rounded-xl">
      <div className="flex items-center gap-2 mb-4 text-[var(--primary)]">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}