import { Loader2 } from "lucide-react";
import { useState } from "react";

export function SimpleMap({ street, city }: { street: string; city: string }) {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const serializedAddress = `${street.split(" ").join("+")}+${city.split(" ").join("+")}+CA`;
  // eslint-disable-next-line node/no-process-env
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {isMapLoading && (
        <div className="w-full h-full flex items-center justify-center gap-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading map...
        </div>
      )}
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?q=${serializedAddress}&key=${
          apiKey
        }&zoom=21&maptype=satellite`}
        width="100%"
        height="100%"
        style={{ border: 0, opacity: isMapLoading ? 0 : 1 }}
        onLoad={() => setIsMapLoading(false)}
      />
    </div>
  );
}
