import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}

function ProfileLink({ imgUrl, title, href }: Props) {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} alt="icon" width={20} height={20} />

      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-accent-blue"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700 translate-y-px">
          {title}
        </p>
      )}
    </div>
  );
}

export default ProfileLink;
