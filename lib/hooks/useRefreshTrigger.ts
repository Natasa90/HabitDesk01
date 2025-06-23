import { useState } from 'react';

export const useRefreshTrigger = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refresh = () => setRefreshTrigger((prev) => prev + 1);
  return { refreshTrigger, refresh };
};
