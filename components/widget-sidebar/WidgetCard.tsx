import { useLocale } from '../../lib/hooks/useLocale';
import { settingsIcon } from '@/components/Icons';
import { WidgetCardItem } from '@/components/widget-sidebar/WidgetCardItem';

const WidgetCard = ({ trendingList, heading }) => {
  const { t } = useLocale();

  return (
    <aside className="bg-[#15181C] w-full  h-full rounded-2xl ">
      <div className={'flex justify-between items-center p-[15px]'}>
        <h2 className={'text-white text-xl font-bold  '}>{heading}</h2>
        <span className={'fill-amber-500'}> {settingsIcon}</span>
      </div>

      <div>
        {trendingList.map((trendingEl) => {
          return <WidgetCardItem key={trendingEl.heading} {...trendingEl} />;
        })}
      </div>
      <footer>
        <p className="text-white text-xs p-[15px] cursor-pointer text-[#1DA1F2]">
          {t('show_more')}
        </p>
      </footer>
    </aside>
  );
};

export { WidgetCard };
