import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');


    return(
        <Box>
            <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6&' textAlign='center'>
                <Typography
                    fontWeight='bold'
                    fontSize='32px'
                    color='primary'
                    >
                        PupupuDiner
                </Typography>
            </Box>

            <Box
            width={isNonMobileScreens ? '50%' : '93%'}
            p='2rem'
            m='2rem auto'
            borderRadius='1.5rem'
            backgroundColor={theme.palette.background.alt}
            sx={{ boxShadow: '10px 10px 12px 0px rgba(0,0,0,0.4)' }}
            >
                <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
                    Welcome to PupupuDiner, the Social Media for Pupupus!
                </Typography>

                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage;