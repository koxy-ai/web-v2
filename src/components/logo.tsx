interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  return (
    <div
      className={`w-12 h-12 bg-accent/50 border-r-1 p-0.5 flex items-center justify-center ${className}`}
    >
      <img src="/fox.svg" className="" />
    </div>
  );
}
