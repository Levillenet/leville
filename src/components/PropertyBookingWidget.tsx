import { useEffect } from "react";

interface PropertyBookingWidgetProps {
  roomTypeId: number | string;
}

/**
 * Per-property Moder booking widget.
 * Renders a fresh #moder-embed container and (re)loads the Moder bundle
 * scoped to the given roomTypeId.
 */
const PropertyBookingWidget = ({ roomTypeId }: PropertyBookingWidgetProps) => {
  useEffect(() => {
    const scriptId = "moder-embed-script";
    const scriptBaseSrc =
      "https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js";

    (window as any).ModerSettings = {
      property: "levillenet",
      roomTypeId,
    };

    const embed = document.getElementById("moder-embed");
    if (embed) embed.innerHTML = "";

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `${scriptBaseSrc}?v=${Date.now()}`;
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
      const e = document.getElementById("moder-embed");
      if (e) e.innerHTML = "";
    };
  }, [roomTypeId]);

  return <div id="moder-embed" />;
};

export default PropertyBookingWidget;
