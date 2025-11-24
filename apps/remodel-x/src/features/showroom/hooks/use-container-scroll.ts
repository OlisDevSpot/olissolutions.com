import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useContainerScroll({ containerRef }: Props) {
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll({
    container: containerRef,
  })

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  })

  return {
    scrolled,
    scrollY
  }
}
