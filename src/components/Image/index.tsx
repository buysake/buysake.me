export const Image = ({
  src,
  webpSrc,
  alt,
  className,
}: {
  src: string;
  webpSrc: string;
  alt: string;
  className?: string;
}) => {
  return <img src={src} alt={alt} className={className} />;
};
