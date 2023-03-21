import { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const theme = useTheme();
    const [userList, setUserList] = useState([]);
    const token = useSelector((state) => state.token);

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.blur;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const main = theme.palette.neutral.main;

    const fullName = `${user.firstName} ${user.lastName}`;

    const [query, setQuery] = useState("");
    const location = useLocation();
    const [focusSearchBar, setFocusSearchBar] = useState(false);

    function clearInput() {
        setQuery("");
    }

    useEffect(() => {
        clearInput()
    }, [location])

    function handleFocusSearchBar(state) {

        {
            state ?
                setFocusSearchBar(state)
                :
                setTimeout(() => {
                    setFocusSearchBar(state);
                }, 100)
        }
    }

    const searchUsers = userList => {
        return (userList.filter(user => user.firstName.toLowerCase().includes(query.toLowerCase()) || user.lastName.toLowerCase().includes(query.toLowerCase())))
        // return (data[1].filter(user => user.collection_name.toLowerCase().includes(query.toLowerCase())))
    }

    const getUsers = async () => {
        const response = await fetch(`https://vixbook-backend.onrender.com/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        setUserList(data);
    }

    useEffect(() => {
        getUsers();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function isHomePage() {
        return window.location.pathname === '/home';
    }

    function handleRefresh() {
        if (!isHomePage()) {
            setTimeout(() => {
                window.location.reload();
              }, 5);
        }
    }
    
    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap='1.75rem'>
                <Typography
                fontWeight='bold'
                fontSize='clamp(1rem, 2rem, 2.25rem)'
                color='primary'
                onClick={() => navigate('/home')}
                sx={{
                    '&:hover': {
                        color: primaryLight,
                        cursor: 'pointer',
                    }
                }}
                >
                    VixBook
                </Typography>
                {isNonMobileScreens && (
                    <Box sx={{ position:'relative' }}>
                    <FlexBetween backgroundColor={ neutralLight } border={`1px solid ${background}`} borderRadius='9px' gap='3rem' padding='0.1rem 1.5rem'>
                        <InputBase 
                        placeholder='Search...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => handleFocusSearchBar(true)}
                        onBlur={() => handleFocusSearchBar(false)}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                    {(query !== "" && focusSearchBar) && 
                        <FlexBetween zIndex='3' width='100%' border={`1px solid ${background}`} borderTop='none' borderRadius='0 0 9px 9px' gap='3rem' backgroundColor={ neutralLight }
                        sx={{ position:'absolute', top:'36px' }}>
                        <Box display='flex' flexDirection='column' width='100%'>
                            {searchUsers(userList).map((user, key) => (
                                    <Link key={ key } to={`/profile/${user._id}`} onClick={() => handleRefresh()} style={{ textDecoration:'none' }}>
                                        <FlexBetween sx={{ cursor:'pointer', '&:hover': { backgroundColor:`${background}` } }}p='1rem 1.5rem' borderRadius='10px'>
                                            <UserImage image={ user.picturePath } />
                                            <Box>
                                                <Typography
                                                color={main}
                                                variant='h5'
                                                fontWeight='500'
                                                textAlign='right'
                                                >
                                                    {user.firstName}
                                                </Typography>
                                                <Typography
                                                textAlign='right'
                                                color={main}
                                                variant='h5'
                                                fontWeight='500'
                                                >
                                                    {user.lastName}
                                                </Typography>
                                            </Box>
                                        </FlexBetween>
                                    </Link>
                            ))}
                        </Box>
                        </FlexBetween>
                    }
                    </Box>
                )}
            </FlexBetween>
            
            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap='2rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: '25px' }} />
                    <Notifications sx={{ fontSize: '25px' }} />
                    <Help sx={{ fontSize: '25px' }} />
                    <FormControl variant='standard' value={fullName}>
                        <Select
                        value={ fullName }
                        sx={{ 
                            backgroundColor: neutralLight,
                            borderRadius: '0.25rem',
                            maxWidth: '400px',
                            p: '0.25rem 1rem',
                            '& .MuiSvgIcon-root': {
                                pr: '0.25rem',
                                width: '3rem'
                            },
                            '& .MuiSelect-select:focus': {
                                backgroundColor: neutralLight
                            }
                         }}
                         input={ <InputBase /> }
                        >
                            
                            <MenuItem value={ fullName }>
                                <Typography>{ fullName }</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                position='fixed'
                right='0'
                bottom='0'
                height='100%'
                zIndex='10'
                maxWidth='500px'
                minWidth='300px'
                backgroundColor= { background }
                sx={{ backdropFilter:'blur(8px)' }}
                >
                    {/* CLOSE ICON */}
                    <Box
                    display='flex'
                    justifyContent='flex-end'
                    p='1rem'
                    >
                        <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='3rem'>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: '25px' }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }} />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />
                        <FormControl variant='standard' value={fullName}>
                            <Select
                            value={ fullName }
                            sx={{ 
                                backgroundColor: neutralLight,
                                maxWidth: '400px',
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {
                                    pr: '0.25rem',
                                    width: '3rem'
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={ <InputBase /> }
                            >
                                
                                <MenuItem value={ fullName }>
                                    <Typography>{ fullName }</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
}

export default Navbar;