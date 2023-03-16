import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  ClearOutlined
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends, setPosts } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, subtitle, userPicturePath, postId, date, friendList=false }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.user._id)
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isFriendMine = friends.find((friend) => friend._id === loggedInUserId);
  const [friendProfile, setFriendProfile] = useState(false);

  function whereAmI() {
    return window.location.pathname !== '/home';
}

  useEffect(() => {
    setFriendProfile(whereAmI());
  }, [])

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!friendProfile) {
      const data = await response.json();
      dispatch(setFriends({ friends: data }))
    }
  };

  const handleRemovePost = async() => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
  }

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={ userPicturePath } size='55px' />
        <Box
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
        >
          <Typography
          color={main}
          variant='h5'
          fontWeight='500'
          sx={{
            '&:hover': {
              color: palette.primary.light,
              cursor: 'pointer'
            }
          }}
          >
            {name}
          </Typography>
          <Typography
          color={medium}
          fontSize='0.75rem'
          >
            {subtitle}
          </Typography>
          <Typography
          color={medium}
          fontSize='0.75rem'
          >
            {date}
          </Typography>
        </Box>
      </FlexBetween>
      {loggedInUserId === friendId || friendProfile ? null
      : ((friendId !== loggedInUserId || friendList) ? (
        <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {friendProfile ? (
              isFriendMine ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )
          ) : (
            isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )
          )}
        </IconButton>
      ) : (
        <IconButton>
          <ClearOutlined
          onClick={() => handleRemovePost()}
          cursor='pointer'
          />
        </IconButton>
      ))}
    </FlexBetween>
  )
}

export default Friend;