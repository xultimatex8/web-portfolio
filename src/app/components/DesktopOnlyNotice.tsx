import Image from "next/image";

export function DesktopOnlyNotice() {
  return (
    <div className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background px-8 text-center">
      <Image
        src="/images/photo.jpeg"
        alt="Alejandro González Macías"
        width={200}
        height={200}
        priority
        className="rounded-full object-cover border-6 border-surface"
      />
      <h1 className="text-3xl font-bold text-foreground">
        Alejandro González Macías&apos;s Portfolio
      </h1>
      <h2 className="text-xl font-semibold text-foreground">
        Best viewed on <span className="text-accent-primary">Desktop</span>
      </h2>
      <p className="text-foreground-secondary max-w-sm">
        This site isn&apos;t optimized for mobile yet. Please visit it from a computer for the best experience.
      </p>
    </div>
  );
}