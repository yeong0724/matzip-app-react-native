import React from 'react';
import RootNavigation from './src/navigations/RootNavigation';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from '@/constants/colors';

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.BLUE_500 }}
      text1Style={{ fontSize: 14 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.PINK_500 }}
      text1Style={{ fontSize: 14 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
