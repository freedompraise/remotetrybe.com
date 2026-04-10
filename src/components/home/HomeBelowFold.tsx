import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Career from "@/components/Career";
import Newsletter from "@/components/Newsletter";
import CTA from "../CTA";
import { cohorts } from "@/utils/cohorts";
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
      <CTA
            text="Ready to Transform Your Career?"
          link={
            cohorts[cohorts.length - 1] && new Date(cohorts[cohorts.length - 1].registrationEnd) > new Date()
              ? "/va-masterclass#pricing"
              : "/va-masterclass"
          }
        />
    </>
  );
}
