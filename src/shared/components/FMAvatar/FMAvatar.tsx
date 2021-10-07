import React, { FC } from 'react';
import { Avatar, Icon } from 'native-base';
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { size } from 'styled-system';

const FMAvatar: FC<{
  badgeIcon?: string;
  avatarClasses?: string;
  badgeClasses?: string;
  size?: string;
  fallbackText: string;
  showBadge: boolean;
  onBadgeClick: (...args: any[]) => any;
  imageUrl: string | undefined;
}> = ({
  fallbackText,
  showBadge,
  onBadgeClick,
  size: avatarSize,
  imageUrl,
  avatarClasses,
  badgeClasses,
  badgeIcon,
}) => (
  <Avatar
    style={tailwind(avatarClasses || 'items-center')}
    bg="tomato"
    size={avatarSize || 'xl'}
    source={{
      uri: imageUrl || 'brokenLink',
    }}
  >
    {fallbackText}
    {showBadge && (
      <Avatar.Badge
        borderWidth={0}
        style={tailwind(badgeClasses || 'w-2/6 h-2/6')}
        bg="transparent"
      >
        <Icon
          onPress={onBadgeClick}
          color="emerald.400"
          style={tailwind(badgeClasses || 'w-full h-full')}
          as={<MaterialCommunityIcons name={badgeIcon || 'camera-plus'} />}
        />
      </Avatar.Badge>
    )}
  </Avatar>
);

// border={0}

export default FMAvatar;
