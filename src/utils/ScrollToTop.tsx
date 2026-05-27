/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function ScrollToTop({
  containerRef,
}: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}