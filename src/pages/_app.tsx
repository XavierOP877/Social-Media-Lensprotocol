
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Header from '../components/Header';


export default function App({ Component, pageProps }: AppProps) {

  const desiredChainId = ChainId.Polygon;
  const queryClient = new QueryClient()



  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
