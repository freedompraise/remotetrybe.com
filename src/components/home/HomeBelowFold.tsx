import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Career from "@/components/Career";
import Newsletter from "@/components/Newsletter";

/**
 * Single lazy boundary for homepage sections below the primary fold.
 */
export default function HomeBelowFold() {
  return (
    <>
      <Testimonials />
      <Team />
      <Career />
      <Newsletter />
    </>
  );
}
