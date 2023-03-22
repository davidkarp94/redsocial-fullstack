import { Box } from '@mui/material';
import { useState } from 'react';

const UserImage = ({ image, size='60px' }) => {

  const [src, setSrc] = useState(`https://vixbook-backend.onrender.com/assets/${image}`);

  const onError = () => {
    setSrc('https://vixbook-backend.onrender.com/assets/defaultuser.jpg')
  }

  return (
    <Box
    width={ size }
    size={ size }
    >
      <img 
      style={{ objectFit: 'cover', borderRadius:'50%' }}
      width={ size }
      height={ size }
      alt='user'
      src={src}
      onError={onError}
      />
    </Box>
  )
}

export default UserImage;