import clsx from "clsx";
import { useEffect, useState, type ImgHTMLAttributes } from "react";

const InprogressImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = props.src || "";
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(true);
    // Cleanup function to avoid memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [props.src]);

  if (loading) {
    return (
      <div className={clsx("bg-gray-500 animate-pulse", props.className)} />
    );
  }
  return <img {...props} />;
};
export default InprogressImage;
