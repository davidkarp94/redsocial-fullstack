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
                        VixBook
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
                    Welcome to VixBook, a FullStack social media project by David Karp.
                </Typography>
                <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
                    You can create an account if you wish, or login using "user: example@example.com, password: example"
                </Typography>

                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage;