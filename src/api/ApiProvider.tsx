import { LibraryClient } from './library-client';
import { createContext, useContext, useState } from 'react';

const ApiContext = createContext<LibraryClient | undefined>(undefined);

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiClient] = useState(new LibraryClient());

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider');
  }
  return context;
}
