import { ReactNode, useState } from 'react';
import { ApiClient } from '../utils/Http/ApiClient';
import { HttpClientContext } from '../contexts/HttpClientContext';
import { HttpClient } from '../utils/Http/HttpClient';

const HttpClientProvider = ({ children }: { children: ReactNode }) => {
  const [httpClient] = useState<HttpClient>(new ApiClient());

  return (
    <HttpClientContext.Provider value={httpClient}>
      {children}
    </HttpClientContext.Provider>
  );
};

export default HttpClientProvider;
