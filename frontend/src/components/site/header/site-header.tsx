import type { HeaderMenuData } from '@/lib/utils/header-menu';
import { HeaderMenu } from './header-menu';

export function SiteHeader({ menu }: { menu: HeaderMenuData }) {
  return <HeaderMenu menu={menu} />;
}
