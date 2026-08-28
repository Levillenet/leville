import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * URL normalization (SEO):
 *  - strips trailing slashes (/majoitukset/ -> /majoitukset)
 *  - lowercases the path (/MAJOITUKSET -> /majoitukset)
 * Search + hash are preserved. Replaces the history entry so no extra step back.
 */
const PathNormalizer = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let next = pathname;
    if (next.length > 1 && next.endsWith("/")) next = next.replace(/\/+$/, "");
    if (next === "") next = "/";
    const lowered = next.toLowerCase();
    if (lowered !== next) next = lowered;
    if (next !== pathname) {
      navigate(next + search + hash, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  return null;
};

export default PathNormalizer;
