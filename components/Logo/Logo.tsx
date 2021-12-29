import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          src="/public/images/icons/RiDokita.png"
          height={400}
          width={400}
          alt="logo"
        />
      </a>
    </Link>
  );
};

export default Logo;
