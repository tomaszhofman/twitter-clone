import Image from 'next/image';
import { SidebarLink } from '@/components/Sidebar/SidebarLink';
import { NAV_MENU } from '@/components/Sidebar/navMenu';
import { useRouter } from 'next/router';
import { Icon } from '@/components/Icon';

function Sidebar({ profileDetails }) {
  const router = useRouter();
  const { username, tag } = profileDetails;

  return (
    <div className="hidden sm:flex min-w-[88px] xl:w-[275px] border-r border-[#2F3336] ">
      <div className="flex-col items-center h-full fixed xl:items-end xl:p-2">
        <div className="flex flex-col justify-between h-full  ">
          <div>
            <div className="hoverAnimation flex justify-center items-center w-14 h-14  ">
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
                  <SidebarLink
                    key={navEl.text}
                    text={navEl.text}
                    icon={navEl.icon}
                    active={isCurrent}
                  />
                );
              })}
            </div>
            <button className="hidden xl:inline bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] mt-[12px]">
              Tweet
            </button>
          </div>

          <div className="text-white flex items-center justify-between hoverAnimation">
            <div className="flex items-center">
              <Image
                src="https://pbs.twimg.com/profile_images/1467773673058750468/X-7z8YWX_x96.png"
                alt=""
                width={40}
                height={40}
                className="rounded-full "
              />
              <div className="hidden xl:inline leading-5 xl:ml-2.5">
                <h5 className="font-bold text-base text-[#D9D9D9]">{username}</h5>
                <p className="text-[#6E767D] font-medium text-sm">@{tag}</p>
              </div>
            </div>
            <Icon name="dotsMenu" className="hidden h-5 xl:inline ml-10 fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
