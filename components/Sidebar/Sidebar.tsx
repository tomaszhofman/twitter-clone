import Image from 'next/image';
import { SidebarLink } from '@/components/Sidebar/SidebarLink';
import { NAVIGATION_LINKS } from '@/components/Sidebar/navMenu';
import { useRouter } from 'next/router';

function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start w-64 p-2 fixed h-full ">
      <div className="hoverAnimation flex justify-center items-center w-14 h-14 xl:ml-24 ">
        <Image
          alt="twitter-icon"
          src="https://res.cloudinary.com/dpa2vabjt/image/upload/v1642360830/twitter_akxzdo.png"
          width={30}
          height={30}
        />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        {NAVIGATION_LINKS.map((navEl) => {
          const isCurrent = router.asPath === navEl.href;
          console.log(isCurrent);
          return (
            <SidebarLink
              key={navEl.text}
              text={navEl.text}
              Icon={navEl.Icon}
              IconActive={navEl.IconActive}
              active={isCurrent}
            />
          );
        })}
      </div>
    </div>
  );
}

export { Sidebar };
