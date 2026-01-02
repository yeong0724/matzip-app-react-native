import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import DrawerButton from '@/components/DrawerButton';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import { FeedStack } from '@/navigations/FeedNavigation';
import { MapStack } from '@/navigations/MapNavigation';
import { MainDrawerParamList } from '@/types/navigation';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { colors } from '@/constants/colors';

type DrawerIconName = 'map' | 'book' | 'calendar';

function DrawerIcons(routeName: keyof MainDrawerParamList, focused: boolean) {
  let iconName: DrawerIconName;

  switch (routeName) {
    case 'Map':
      iconName = 'map';
      break;
    case 'Feed':
      iconName = 'book';
      break;
    case 'Calendar':
      iconName = 'calendar';
      break;
  }

  return (
    <FontAwesome6
      name={iconName}
      iconStyle={'solid'}
      size={20}
      color={focused ? colors.WHITE : colors.GRAY_300}
    />
  );
}

const MainDrawer = createDrawerNavigator({
  screenOptions: ({ route }) => {
    return {
      drawerStyle: {
        width: '60%',
        backgroundColor: colors.WHITE,
      },
      drawerLabelStyle: {
        fontWeight: 'bold',
      },
      drawerItemStyle: {
        borderRadius: 5,
      },
      drawerType: 'front',
      drawerActiveTintColor: colors.WHITE,
      drawerActiveBackgroundColor: colors.PINK_700,
      drawerInactiveTintColor: colors.GRAY_500,
      drawerInactiveBackgroundColor: colors.GRAY_100,
      drawerIcon: ({ focused }) => DrawerIcons(route.name as keyof MainDrawerParamList, focused),
      headerTitleAlign: 'center',
      headerBackButtonDisplayMode: 'minimal',
      headerTintColor: colors.PINK_400,
      headerStyle: {
        backgroundColor: colors.WHITE,
        shadowColor: colors.GRAY_500,
      },
      headerTitleStyle: {
        fontSize: 16,
      },
    };
  },
  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: 'Feed',
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: 'Calendar',
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: props => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
