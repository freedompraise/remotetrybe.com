export interface NavLink {
  to: string;
  label: string;
  onClick?: string;
  className?: string;
  isExternalSection?: boolean;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    to: "/",
    label: "Home",
    onClick: "/#hero"
  },
  {
    to: "/#about",
    label: "About",
    onClick: "/#about",
    children: [
      {
        to: "/odosa-egharevba",
        label: "Our Founder"
      }
    ]
  },
  {
    to: "/#programs",
    label: "Programs",
    onClick: "/#programs"
  },
  {
    to: "/#career",
    label: "Career",
    onClick: "/#career"
  },
  {
    to: "/#testimonials",
    label: "Testimonials",
    onClick: "/#testimonials"
  },
  {
    to: "/affiliate",
    label: "Affiliate"
  },
  {
    to: "/#contact",
    label: "Contact",
    onClick: "/#footer"
  }
];

export const enrollNowLink: NavLink = {
  to: "/va-masterclass#pricing",
  label: "Enroll Now",
  onClick: "/va-masterclass#pricing",
  className: "btn-primary",
  isExternalSection: true
}; 