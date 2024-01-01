import { createContext, useState } from 'react';

export const ReloadContext = createContext({
  needsReload: false,
  refreshData: () => {}
});

export const ReloadContextProvider = ({ children }) => {
  const [needsReload, setNeedsReload] = useState(false);

  const refreshData = () => {
    setNeedsReload(prevState => !prevState);
  };

  return (
    <ReloadContext.Provider value={{ needsReload, refreshData }}>
      {children}
    </ReloadContext.Provider>
  );
};
