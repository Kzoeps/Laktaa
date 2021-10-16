import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../screens/auth/store/authSlice';
import FMAvatar from '../FMAvatar/FMAvatar';
import { NavigationProps, RoutePaths } from '../../models/model';

type NavHeaderNavProps = NavigationProps<RoutePaths>;
const FMNavHeaderProfile: FC<
  {
    imageUri: string | undefined;
    userInitials: string;
    userEmail: string;
  } & NavHeaderNavProps
> = ({ navigation, imageUri, userInitials, userEmail }) => {
  return (
    <TouchableOpacity
      style={tailwind('mr-4')}
      onPress={() => navigation.navigate(RoutePaths.userProfile, { userEmail })}
    >
      <FMAvatar
        size="md"
        onBadgeClick={() => undefined}
        imageUrl={imageUri}
        fallbackText={userInitials}
        showBadge={false}
      />
    </TouchableOpacity>
  );
};

export default FMNavHeaderProfile;
