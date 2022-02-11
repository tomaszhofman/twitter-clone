import { WidgetCard } from '@/components/widget-sidebar/WidgetCard';
import { useLocale } from '../../lib/hooks/useLocale';

const TrendingView = ({ trendingList }) => {
  const { t } = useLocale();
  return (
    <div className="flex-grow max-w-[350px] m-[30px] max-h-full h-full sticky -top-[500px]">
      <WidgetCard heading={t('trending_title')} trendingList={trendingList} />;
      <WidgetCard heading={t('who_to_follow_title')} trendingList={trendingList} />;
    </div>
  );
};

export { TrendingView };
