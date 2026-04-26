export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[var(--muted)] border border-white/5 p-2 rounded-md outline-none focus:border-[var(--primary)]"
    />
  );
}