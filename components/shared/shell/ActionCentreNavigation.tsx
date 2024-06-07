import React from 'react';
import NavigationItems, { MenuItem, NavigationProps } from './NavigationItems';
import { useTranslation } from 'react-i18next';
import { HomeIcon, WrenchScrewdriverIcon, PresentationChartBarIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

const ActionCentreNavigation = ({ activePathname }: NavigationProps) => {
  const { t } = useTranslation('common');

  const menus: MenuItem[] = [
    {
      name: t('Dashboard'),
      href: '/dashboard',
      icon: PresentationChartLineIcon,
      active: activePathname === '/dashboard',
    },
    {
      name: t('Action Centre'),
      href: '/dashboard/action',
      icon: WrenchScrewdriverIcon,
      active: activePathname === '/dashboard/action',
    },
  ];

  return <NavigationItems menus={menus} />;
};

export default ActionCentreNavigation;
