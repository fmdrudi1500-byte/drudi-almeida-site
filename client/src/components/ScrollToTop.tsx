import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — resets window scroll position to the top on every route change.
 * Place this component inside the Router, above the <Switch>.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
