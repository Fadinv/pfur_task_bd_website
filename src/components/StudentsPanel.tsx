import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	Input,
	DrawerFooter,
	DrawerOverlay,
	Flex,
	IconButton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	DrawerHeader, FormLabel, Stack, Select,
} from '@chakra-ui/react';
import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import React, {useState} from 'react';
import {
	CreateBookMutationVariables,
	useCreateBookMutation,
	useUpdateBookMutation,
	useGetAllBooksQuery,
	useDeleteBookByIdMutation,
	useGetAllUsersQuery,
	UpdateBookMutationVariables,
	useRegistryMutation,
	RegistryMutationVariables,
	UpdateStudentMutationVariables,
	useUpdateStudentMutation, useGetMeQuery,
} from '../gql';
import Loading from './Loading';

const StudentsPanel = () => {
	const allBooksQuery = useGetAllBooksQuery();
	const allUsersQuery = useGetAllUsersQuery();
	const [createDrawerIsOpen, setCreateDrawerIsOpen] = useState(false);
	const [updateDrawerIsOpen, setUpdateDrawerIsOpen] = useState(false);
	const [chooseStudentDrawerIsOpen, setChooseStudentDrawerIsOpen] = useState(false);
	const meQuery = useGetMeQuery();
	const btnRef = React.useRef();
	const [registry, registryMutationData] = useRegistryMutation();
	const [updateStudent, updateStudentMutationData] = useUpdateStudentMutation();
	const [currentEditedStudent, setCurrentEditedStudent] = useState<RegistryMutationVariables>({options: {name: '', password: '', email: '', phone: '', isAdmin: false}});
	const [currentUpdatingStudent, setCurrentUpdatingStudent] = useState<UpdateStudentMutationVariables>({options: {name: '', email: '', phone: '', isAdmin: false, password: ''}});
	const [currentEditEmail, setCurrentEditEmail] = useState<null | string>(null);
	const [checkPassword, setCheckPassword] = useState<null | string>(null);
	const [chosenStudentId, setChosenStudentId] = useState<null | number>(null);
	const [deleteBookById, deleteBookByIdMutationData] = useDeleteBookByIdMutation();

	const isAdmin = meQuery?.data?.getMe?.isAdmin;

	const onDeleteBookById = (id: number) => {
		deleteBookById({variables: {bookId: id}})
			.then(allBooksQuery.refetch);
	};

	const onEditStudentByEmail = (email: string) => {
		setUpdateDrawerIsOpen(true);
		setCurrentEditEmail(email);
		setCheckPassword('');
		const vars: UpdateStudentMutationVariables = {options: {name: '', password: '', email: '', phone: '', isAdmin: false}};
		const user = allUsersQuery.data?.getAllUsers.find(user => user.email === email);
		if (user) {
			vars['options']['password'] = '';
			vars['options']['name'] = user.name;
			vars['options']['isAdmin'] = user.isAdmin;
			vars['options']['phone'] = user.phone;
			vars['options']['email'] = user.email;
		}
		setCurrentUpdatingStudent(vars);
	};

	const onCreateStudent = () => {
		if (!currentEditedStudent.options?.name || !currentEditedStudent.options?.email || !currentEditedStudent.options?.password) return;
		registry({variables: {...currentEditedStudent}})
			.then(() => {
				setCreateDrawerIsOpen(false);
				setCheckPassword('');
				allUsersQuery.refetch().catch();
			});
	};

	const onUpdateStudent = () => {
		if (!currentUpdatingStudent?.options?.email) return;
		updateStudent({variables: {...currentUpdatingStudent}})
			.then(() => {
				setUpdateDrawerIsOpen(false);
				setCheckPassword('');
				allUsersQuery.refetch().catch();
			});
	};

	if (allBooksQuery.loading) return (
		<div style={{position: 'relative', height: '100%', width: '100%'}}>
			<Loading/>
		</div>
	);

	const renderStudentList = () => {
		if (!allUsersQuery || allUsersQuery.loading) {
			return (
				<div style={{position: 'absolute', height: '100%', width: '100%'}}>
					<Loading/>
				</div>
			);
		}
		if (!allUsersQuery.data?.getAllUsers.length) {
			return (
				<div style={{padding: '24px', position: 'absolute', height: '100%', width: '100%', textAlign: 'center'}}>
					Список пуст
				</div>
			);
		}
		return (
			<Tbody>
				{
					allUsersQuery?.data?.getAllUsers.map((u) => {
						return (
							<Tr>
								<Td>{u.id}</Td>
								<Td>{u.name}</Td>
								<Td>{u.email}</Td>
								{isAdmin && <Td textAlign={'end'}>
									<IconButton
										marginRight={4}
										aria-label={'Редактировать'}
										colorScheme={'blue'}
										icon={<EditIcon/>}
										onClick={() => onEditStudentByEmail(u.email)}
									/>
									{/*<IconButton*/}
									{/*	aria-label={'Удалить'}*/}
									{/*	colorScheme={'red'}*/}
									{/*	icon={<DeleteIcon/>}*/}
									{/*	onClick={() => onDeleteBookById(u.id)}*/}
									{/*/>*/}
								</Td>}
							</Tr>
						);
					})
				}
			</Tbody>
		);
	};

	return (
		<Flex direction={'column'} gap={8}>
			{isAdmin && <Button
				leftIcon={<AddIcon/>}
				colorScheme={'green'}
				marginRight={'auto'}
				onClick={() => {
					setCreateDrawerIsOpen(true);
					setCheckPassword('');
				}}
				ref={btnRef}
			>
				Добавить студента
			</Button>}

			<Drawer
				isOpen={createDrawerIsOpen}
				placement='right'
				onClose={() => {
					setCreateDrawerIsOpen(false);
					setCheckPassword('');
				}}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Зарегестрировать студента</DrawerHeader>

					<DrawerBody>
						<FormLabel marginTop={4}>Имя</FormLabel>
						<Input
							placeholder='Введите имя студента'
							value={currentEditedStudent.options.name}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], name: e.target.value ?? ''};
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Email</FormLabel>
						<Input
							placeholder='Введите почту студента'
							value={currentEditedStudent.options.email}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], email: e.target.value ?? ''};
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Пароль</FormLabel>
						<Input
							placeholder='Введите пароль'
							value={currentEditedStudent.options.password}
							type={'password'}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], password: e.target.value ?? ''};
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Подтверждение пароля</FormLabel>
						<Input
							placeholder='Повторно введите пароль'
							value={checkPassword}
							type={'password'}
							onChange={(e) => {
								setCheckPassword(e.target.value || '');
							}}
						/>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={() => {
							setCreateDrawerIsOpen(false);
							setCheckPassword('');
						}}>
							Отменить
						</Button>
						<Button
							colorScheme='blue'
							onClick={onCreateStudent}
							disabled={!currentEditedStudent.options.name || !currentEditedStudent.options.email || !currentEditedStudent.options.password || currentEditedStudent.options.password !== checkPassword}
							isLoading={registryMutationData.loading}
						>
							Сохранить
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<Drawer
				isOpen={updateDrawerIsOpen}
				placement='right'
				onClose={() => {
					setUpdateDrawerIsOpen(false);
					setCheckPassword('');
				}}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Редактирование студента</DrawerHeader>

					<DrawerBody>
						<FormLabel marginTop={4}>Имя</FormLabel>
						<Input
							placeholder='Введите имя'
							value={currentUpdatingStudent?.options?.name}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], name: e.target.value ?? ''};
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Email</FormLabel>
						<Input
							placeholder=''
							value={currentUpdatingStudent.options.email}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], email: e.target.value ?? ''};
									return newState;
								});
							}}
							isDisabled
						/>
						<FormLabel marginTop={4}>Пароль</FormLabel>
						<Input
							placeholder='Введите пароль'
							value={currentUpdatingStudent.options.password}
							type={'password'}
							onChange={(e) => {
								setCurrentEditedStudent(prev => {
									const newState = {...prev};
									newState['options'] = {...newState['options'], password: e.target.value ?? ''};
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Подтверждение пароля</FormLabel>
						<Input
							placeholder='Повторно введите пароль'
							value={checkPassword}
							type={'password'}
							onChange={(e) => {
								setCheckPassword(e.target.value || '');
							}}
						/>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={() => {
							setUpdateDrawerIsOpen(false);
							setCheckPassword('');
						}}>
							Отменить
						</Button>
						<Button
							colorScheme='blue'
							onClick={onUpdateStudent}
							disabled={!currentEditedStudent.options.name}
							isLoading={registryMutationData.loading}
						>
							Сохранить
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<TableContainer>
				<Table size='sm'>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Имя</Th>
							<Th>email</Th>
							<Th> </Th>
						</Tr>
					</Thead>
					{renderStudentList()}
					{/*<Tfoot>*/}
					{/*	<Tr>*/}
					{/*		<Th>To convert</Th>*/}
					{/*		<Th>into</Th>*/}
					{/*		<Th isNumeric>multiply by</Th>*/}
					{/*	</Tr>*/}
					{/*</Tfoot>*/}
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default StudentsPanel;