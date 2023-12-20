import {
	Link as ChakraLink,
	Text,
	Code,
	List,
	ListIcon,
	ListItem,
	Button, Flex, Spinner, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import {CheckCircleIcon, LinkIcon} from '@chakra-ui/icons';
import React from 'react';
import BooksPanel from '../components/BooksPanel';

import {Hero} from '../components/Hero';
import {Container} from '../components/Container';
import LoginPage from '../components/LoginPage';
import {Main} from '../components/Main';
import {MainActionsButtons} from '../components/MainActionsButtons';
import {CTA} from '../components/CTA';
import {Footer} from '../components/Footer';
import MyBooksPanel from '../components/MyBooksPanel';
import StudentsPanel from '../components/StudentsPanel';
import {useGetMeQuery, useLogoutMutation} from '../gql';
import {useLoggedIn} from '../hooks/useLoggedIn';

const Index = () => {
	const meQuery = useGetMeQuery();
	const loggedIn = useLoggedIn();
	const isAdmin = meQuery?.data?.getMe?.isAdmin;

	if (meQuery.loading) {
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
					justifyContent={'center'}
					alignItems={'center'}
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

	if (loggedIn) {
		return (
			<Container height="100vh">
				{/*<Hero/>*/}
				<Main>
					<Tabs>
						<TabList>
							<Tab>Все книги</Tab>
							{isAdmin ? <Tab>Студенты</Tab> : <Tab>Мои книги</Tab>}
						</TabList>

						<TabPanels>
							<TabPanel>
								<BooksPanel/>
							</TabPanel>
							<TabPanel>
								{isAdmin ? <StudentsPanel/> : <MyBooksPanel/>}
							</TabPanel>
							<TabPanel>
								<p>three!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
					{/*<Text color="text">*/}
					{/*	Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}*/}
					{/*	<Code>TypeScript</Code>.*/}
					{/*</Text>*/}

					{/*<List spacing={3} my={0} color="text">*/}
					{/*	<ListItem>*/}
					{/*		<ListIcon as={CheckCircleIcon} color="green.500"/>*/}
					{/*		<ChakraLink*/}
					{/*			isExternal*/}
					{/*			href="https://chakra-ui.com"*/}
					{/*			flexGrow={1}*/}
					{/*			mr={2}*/}
					{/*		>*/}
					{/*			Chakra UI <LinkIcon/>*/}
					{/*		</ChakraLink>*/}
					{/*	</ListItem>*/}
					{/*	<ListItem>*/}
					{/*		<ListIcon as={CheckCircleIcon} color="green.500"/>*/}
					{/*		<ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>*/}
					{/*			Next.js <LinkIcon/>*/}
					{/*		</ChakraLink>*/}
					{/*	</ListItem>*/}
					{/*</List>*/}
				</Main>

				<MainActionsButtons/>
				<Footer>
					<Text>PFUR ❤️</Text>
				</Footer>
				<CTA/>
			</Container>
		);
	} else {
		return <LoginPage/>
	}
};
export default Index;
