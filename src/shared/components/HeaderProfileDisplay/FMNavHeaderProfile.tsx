import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../screens/auth/store/authSlice';
import FMAvatar from '../FMAvatar/FMAvatar';

const FMNavHeaderProfile: FC<{
  navigation: any;
  imageUri: string | undefined;
  userInitials: string;
}> = ({ navigation, imageUri, userInitials }) => {
  return (
    <TouchableOpacity
      style={tailwind('mr-4')}
      onPress={() => navigation.navigate('User Profile')}
    >
      <FMAvatar
        size="md"
        onBadgeClick={() => undefined}
        fallbackText={userInitials}
        showBadge={false}
        imageUrl={imageUri}
      />
    </TouchableOpacity>
  );
};

export default FMNavHeaderProfile;
