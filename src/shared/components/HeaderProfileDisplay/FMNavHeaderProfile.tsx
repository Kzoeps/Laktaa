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
    userEmail?: string;
    phoneNumber: string;
  } & NavHeaderNavProps
> = ({ navigation, imageUri, userInitials, userEmail, phoneNumber }) => {
  return (
    <TouchableOpacity
      style={tailwind('mr-4')}
      onPress={() =>
        navigation.navigate(RoutePaths.userProfile, { phoneNumber })
      }
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
