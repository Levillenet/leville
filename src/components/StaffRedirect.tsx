import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { staffRedirectUrl } from "@/lib/staffRedirect";

export default function StaffRedirect({ admin = false }: { admin?: boolean }) {
  const { unit } = useParams<{ unit: string }>();

  useLayoutEffect(() => {
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = existing?.getAttribute("content");
    const meta = existing ?? document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    if (!existing) document.head.appendChild(meta);

    if (admin || unit !== undefined) {
      window.location.replace(staffRedirectUrl(admin ? undefined : unit));
    }

    return () => {
      if (!existing) meta.remove();
      else if (previousContent === null || previousContent === undefined) meta.removeAttribute("content");
      else meta.setAttribute("content", previousContent);
    };
  }, [admin, unit]);

  return null;
}