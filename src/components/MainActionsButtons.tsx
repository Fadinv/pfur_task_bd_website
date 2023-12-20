import {useColorMode, IconButton, Button, Flex, Icon, Tooltip} from '@chakra-ui/react';
import {SunIcon, MoonIcon, UnlockIcon} from '@chakra-ui/icons';
import {useGetMeQuery, useLogoutMutation} from '../gql';

export const MainActionsButtons = () => {
	const meQuery = useGetMeQuery();
	const {colorMode, toggleColorMode} = useColorMode();
	const isDark = colorMode === 'dark';
	const [logout, logoutMutationData] = useLogoutMutation();
	const onLogout = () => {
		logout()
			.then(me => meQuery.refetch());
	};

	return (
		<Flex
			position={'fixed'}
			top={4}
			right={4}
			gap={4}
		>
			{meQuery?.data?.getMe?.isAdmin && (
				<Tooltip label={'Права администратора'} aria-label={'A tooltip'}>
					<IconButton
						icon={<UnlockIcon/>}
						aria-label={'Администратор'}
						colorScheme={'yellow'}
					/>
				</Tooltip>
			)}
			<IconButton
				icon={isDark ? <SunIcon/> : <MoonIcon/>}
				aria-label={'Toggle Theme'}
				colorScheme={'green'}
				onClick={toggleColorMode}
			/>
			<Button colorScheme={'red'} onClick={onLogout}>Выйти</Button>
		</Flex>
	);
};
