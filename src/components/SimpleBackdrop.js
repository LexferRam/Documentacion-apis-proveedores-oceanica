'use client'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoadingProvider } from '@/context/LoadingContext';

export default function SimpleBackdrop() {

  const { loading, setLoading } = useLoadingProvider()

  const handleClose = () => {
    setLoading(false);
  };


  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999999 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress  sx={{ zIndex: 99999999 }} color="inherit" />
      </Backdrop>
  );
}

