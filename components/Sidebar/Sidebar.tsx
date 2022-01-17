import Image from 'next/image';
import { SidebarLink } from '@/components/Sidebar/SidebarLink';
import { NAV_MENU } from '@/components/Sidebar/navMenu';
import { useRouter } from 'next/router';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';

function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 h-full ">
      <div className="hoverAnimation flex justify-center items-center w-14 h-14 xl:ml-24 ">
        <Image
          alt="twitter-icon"
          src="https://res.cloudinary.com/dpa2vabjt/image/upload/v1642360830/twitter_akxzdo.png"
          width={30}
          height={30}
        />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5">
        {NAV_MENU.map((navEl) => {
          const isCurrent = router.asPath === navEl.href;
          return (
            <SidebarLink key={navEl.text} text={navEl.text} icon={navEl.icon} active={isCurrent} />
          );
        })}
      </div>
      <button className="hidden xl:inline  bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>

      <div className=" text-white flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5 w-56">
        <img
          src="https://pbs.twimg.com/profile_images/1467773673058750468/X-7z8YWX_x96.png"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">Tomasz</h4>
          <p className="text-gray-300">@tomasttttttz</p>
        </div>
        <DotsCircleHorizontalIcon className="hidden h-5 xl:inline ml-10" />
      </div>
    </div>
  );
}

export { Sidebar };
