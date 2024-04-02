'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } }));

  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>

  );
}

export default Providers;
