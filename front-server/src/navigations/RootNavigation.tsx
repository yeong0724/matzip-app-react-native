import useAuth from '@/hooks/queries/useAuth';
import AuthNavigation from '@/navigations/AuthNavigation';
import DrawerNavigation from '@/navigations/DrawerNavigation';

function RootNavigation() {
  const { isLogin } = useAuth();

  return isLogin ? <DrawerNavigation /> : <AuthNavigation />;
}

export default RootNavigation;
