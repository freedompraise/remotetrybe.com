import React from "react";

const members = [
  { name: "Victor", role: "Video Editor", img: "/images/Victor.png" },
  { name: "Godgift Ndubuisi", role: "Executive Assistant", img: "/images/Godgift Ndubuisi.jpg" },
  { name: "Amara Ikwuakam", role: "Social Media Manager", img: "/images/amara-ikwuakam.jpeg" },
  { name: "Cole Obaro Omo-Emevor", role: "Graphics Designer", img: "/images/Cole Obaro Omo-Emevor.jpg" },
  { name: "Praise Freedom Dike", role: "Software Developer", img: "/images/praise-freedom-dike.jpg" },
  { name: "Chidimma Esther Ebuka-Azodo", role: "Executive Assistant", img: "/images/chidinma-esther-ebuka-azodo.jpeg" },
  { name: "Joy Chukwudebelu", role: "CEO's Personal Assistant", img: "/images/joy.jpeg" },
];

// Duplicate for seamless loop
const marqueeMembers = [...members, ...members];

export default function Team() {
  return (
    <section aria-labelledby="team-heading" className="py-12 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <h2 id="team-heading" className="text-3xl font-bold text-foreground mb-4 text-center">
          Our Team
        </h2>
        <p className="text-lg text-muted-foreground text-center">
          Meet the dedicated professionals behind the scenes of our success.
        </p>
      </div>

      {/* Marquee scroll */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {marqueeMembers.map((m, i) => (
            <div
              key={`${m.name}-${i}`}
              className="flex-shrink-0 w-48 mx-4 flex flex-col items-center text-center"
            >
              <div className="h-32 w-32 overflow-hidden rounded-full bg-muted border-2 border-border">
                <img
                  src={m.img}
                  alt={m.name}
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
