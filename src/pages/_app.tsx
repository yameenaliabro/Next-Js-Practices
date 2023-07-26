import { AuthProvider } from '@src/contexts';
import { DashboardLayout, MainLayout } from '@src/layouts';
import '@src/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ConfigProvider } from 'antd'
import { ReactQueryProvider } from '@src/services';

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  if (asPath.includes("dashboard")) {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  }
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default function App(props: AppProps) {
  return (
    <ConfigProvider componentSize='large'>
      <ReactQueryProvider>
        <AuthProvider>
          <MyApp {...props} />
        </AuthProvider >
      </ReactQueryProvider>
    </ConfigProvider>
  )
}
