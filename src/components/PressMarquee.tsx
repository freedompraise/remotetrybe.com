import { cn } from "@/lib/utils";

type PressMarqueeProps = {
  variant?: "hero" | "founder";
  className?: string;
};

type PressArticle = {
  source: string;
  title: string;
  href: string;
  logo: string;
};

const pressArticles: PressArticle[] = [
  {
    source: "Vanguard News",
    title: "Odosa calls for greater investment in Nigeria’s remote work economy",
    href: "https://www.vanguardngr.com/2026/07/odosa-calls-for-greater-investment-in-nigerias-remote-work-economy/amp/",
    logo: "https://logo.clearbit.com/www.vanguardngr.com",
  },
  {
    source: "Guardian Nigeria",
    title: "Egharevba Odosa bags nomination for 100 Under 40 Tech Award",
    href: "https://guardian.ng/news/nigeria/metro/egharevba-odosa-bags-nomination-for-prestigious-100-under-40-tech-award/",
    logo: "https://logo.clearbit.com/guardian.ng",
  },
  {
    source: "Vanguard News",
    title: "Remote Trybe unveils social media design course",
    href: "https://www.vanguardngr.com/2026/06/remote-trybe-unveils-social-media-design-course-expanding-africas-digital-skills/amp/",
    logo: "https://logo.clearbit.com/www.vanguardngr.com",
  },
];

const duplicatedArticles = [...pressArticles, ...pressArticles];

function PressMarquee({ variant = "hero", className }: PressMarqueeProps) {
  const isHero = variant === "hero";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]",
          isHero ? "text-gray-500" : "text-foreground/50"
        )}
      >
        <span className={cn("inline-block h-2 w-2 rounded-full", isHero ? "bg-primary/60" : "bg-primary/60")} />
        <span>{isHero ? "As seen in" : "Featured press"}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r",
            isHero ? "from-white to-transparent" : "from-[#FDF8F4] to-transparent"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l",
            isHero ? "from-white to-transparent" : "from-[#FDF8F4] to-transparent"
          )}
        />

        <div className={cn("flex min-w-max animate-marquee gap-3 md:gap-4", isHero ? "[animation-duration:30s]" : "[animation-duration:28s]") }>
          {duplicatedArticles.map((article, index) => (
            <a
              key={`${article.source}-${article.title}-${index}`}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex shrink-0 items-center gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                isHero
                  ? "border-border bg-white text-dark shadow-sm hover:border-primary/20"
                  : "border-border bg-white/80 text-foreground/80 shadow-sm hover:border-primary/20 hover:bg-white"
              )}
              aria-label={`Read article from ${article.source}`}
            >
              <img
                src={article.logo}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="h-7 w-7 rounded-full object-contain bg-white p-1 ring-1 ring-black/5"
                onError={(event) => {
                  const target = event.currentTarget;
                  target.style.display = "none";
                }}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-[10px] font-semibold uppercase tracking-[0.18em]",
                    isHero ? "text-gray-500" : "text-muted-foreground"
                  )}
                >
                  {article.source}
                </p>
                <p className="truncate text-sm font-medium text-current max-w-[22rem]">
                  {article.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PressMarquee;
