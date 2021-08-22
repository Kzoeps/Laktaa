import React, { FC } from 'react';
import { Avatar, Icon } from 'native-base';
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FMAvatar: FC<{ badgeIcon?: string,avatarClasses?: string, badgeClasses?: string, fallbackText: string, showBadge: boolean, onBadgeClick: (...args: any[]) => any, imageUrl: string | undefined }> =
	({
		 fallbackText,
		 showBadge,
		 onBadgeClick,
		 imageUrl,
		 avatarClasses,
		 badgeClasses,
		badgeIcon
	 }) =>
		<Avatar
			style={tailwind(avatarClasses || 'items-center')}
			bg='tomato'
			size='xl'
			source={{
				uri: imageUrl || 'brokenLink',
			}}>
			{fallbackText}
			{showBadge &&
			<Avatar.Badge
				style={tailwind(badgeClasses || 'w-2/6 h-2/6')}
				border={0}
				bg='transparent'
			>
				<Icon
					onPress={onBadgeClick}
					color='emerald.400'
					style={tailwind(badgeClasses || 'w-full h-full')}
					as={<MaterialCommunityIcons name={badgeIcon || 'camera-plus'} />}
				/>
			</Avatar.Badge>}
		</Avatar>;

	export default FMAvatar;
