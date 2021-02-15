import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const UserAvatar = ({name,image}) => <Avatar alt={name} src={image} className="large" />

export default UserAvatar;