export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`2xl:w-[1200px] xl:w-[1000px] lg:w-[970px] md:w-full sm:w-full px-[20px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
