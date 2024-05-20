import Image from "next/image";
import Link from "next/link";

type Props = {
  route: string;
  isActive: boolean;
  imgURL: string;
  label: string;
};

function LeftSideBarLink({ route, isActive, imgURL, label }: Props) {
  return (
    <Link
      href={route}
      key={route}
      className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        src={imgURL}
        width={20}
        height={20}
        alt="logo"
        className={`${isActive ? "" : "invert-colors"}`}
      />
      <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden `}>
        {label}
      </p>
    </Link>
  );
}

export default LeftSideBarLink;
