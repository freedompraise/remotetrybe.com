import React from "react";

const members = [
  { name: "Victor", role: "Video Editor", img: "/images/Victor.png" },

    { name: "Godgift Ndubuisi", role: "Executive Assistant", img: "/images/Godgift Ndubuisi.jpg" },
      { name: "Amara Ikwuakam", role: "Social Media Manager", img: "/images/amara-ikwuakam.jpeg" },
  { name: "Cole Obaro Omo-Emevor", role: "Graphics Designer", img: "/images/Cole Obaro Omo-Emevor.jpg" },
    { name: "Praise Freedom Dike", role: "Software Developer", img: "/images/praise-freedom-dike.jpg" },


];

export default function Team() {
  return (
    <section aria-labelledby="team-heading" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="team-heading" className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Our Team
        </h2>
            <p className="mt-4 text-lg text-gray-500 text-center mb-10">
              Meet the dedicated professionals behind the scenes of our success.
            </p>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {members.map((m) => (
            <li key={m.name} className="flex flex-col items-center text-center">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">{m.name}</p>
              <p className="text-xs text-gray-500">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
