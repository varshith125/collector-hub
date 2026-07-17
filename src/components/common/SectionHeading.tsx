interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
