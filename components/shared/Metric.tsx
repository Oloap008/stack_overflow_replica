import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

function Metric({
  imgUrl,
  alt,
  value,
  href,
  textStyles,
  title,
  isAuthor,
}: MetricProps) {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />

      <p className={`${textStyles} flex items-end gap-1`}>
        {value}
        <span className="small-regular line-clamp-1 max-sm:hidden">
          {title}
        </span>
      </p>
    </>
  );

  if (href)
    return (
      <Link href={href} className="flex-center gap-2">
        {metricContent}
      </Link>
    );

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
}

export default Metric;
