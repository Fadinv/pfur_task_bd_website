import {Button, Flex, FormControl, FormLabel, Input, Spinner, Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import {useGetMeQuery, useLoginMutation} from '../gql';

const LoginPage = () => {
	const me = useGetMeQuery();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [login, loginMutationData] = useLoginMutation();
	const onLogin = () => {
		login({variables: {options: {password, email}}})
			.then((res) => {
				if (res.data.login.user) me.refetch().catch();
			});
	};

	if (me.loading) {
		return (
			<Flex
				position={'fixed'}
				top={0}
				right={0}
				bottom={0}
				left={0}
			>
				<Flex
					margin={'auto'}
					direction={'column'}
					gap={8}
					minW={'40vw'}
				>
					<Spinner
						thickness='8px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex
			position={'fixed'}
			top={0}
			right={0}
			bottom={0}
			left={0}
		>
			<Flex
				margin={'auto'}
				direction={'column'}
				gap={8}
				minW={'40vw'}
			>
				<Text as={'h1'} fontSize={24}>PFUR Library</Text>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						value={email} onChange={(event) => setEmail(event.target.value || '')}
						placeholder={'Enter email'}
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						value={password} type={'password'} onChange={(event) => setPassword(event.target.value || '')}
						placeholder={'Enter password'}/>
				</FormControl>

				<Button
					onClick={onLogin}
					isLoading={loginMutationData.loading}
					colorScheme={'blue'}
				>
					Войти
				</Button>
			</Flex>
		</Flex>
	);
};

export default LoginPage;