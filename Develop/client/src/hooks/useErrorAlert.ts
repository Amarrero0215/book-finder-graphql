import { useState, useEffect } from 'react';
import type { ApolloError } from '@apollo/client';

export function useErrorAlert(error: ApolloError | undefined): [boolean, () => void] {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(!!error); 
  }, [error]);

  const handleAlertClose = () => setShowAlert(false);

  return [showAlert, handleAlertClose];
}
