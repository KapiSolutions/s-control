import { useEffect, useState, useMemo } from "react";

export default function useIsVisible(ref: React.RefObject<Element | null>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

  useEffect(() => {
    const currentRef = ref.current;
    currentRef && observer.observe(ref.current);

    return () => {
      currentRef && observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
