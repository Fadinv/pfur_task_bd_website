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
import {AddIcon, DeleteIcon, EditIcon, CheckCircleIcon} from '@chakra-ui/icons';
import React, {useState} from 'react';
import {
	CreateBookMutationVariables,
	useCreateBookMutation,
	useUpdateBookMutation,
	useGetAllBooksQuery,
	useDeleteBookByIdMutation,
	useGetAllUsersQuery, UpdateBookMutationVariables, useGetMeQuery,
} from '../gql';
import Loading from './Loading';

const BooksPanel = () => {
	const allBooksQuery = useGetAllBooksQuery();
	const allUsersQuery = useGetAllUsersQuery();
	const [createDrawerIsOpen, setCreateDrawerIsOpen] = useState(false);
	const [updateDrawerIsOpen, setUpdateDrawerIsOpen] = useState(false);
	const [chooseStudentDrawerIsOpen, setChooseStudentDrawerIsOpen] = useState(false);
	const btnRef = React.useRef();
	const meQuery = useGetMeQuery();
	const [createBook, createBookMutationData] = useCreateBookMutation();
	const [updateBook, updateBookMutationData] = useUpdateBookMutation();
	const [currentEditedBook, setCurrentEditedBook] = useState<CreateBookMutationVariables>({name: '', count: 1, imageUrl: ''});
	const [currentUpdatingBook, setCurrentUpdatingBook] = useState<UpdateBookMutationVariables>({name: '', count: 1, imageUrl: '', bookId: null, userId: null});
	const [currentEditId, setCurrentEditId] = useState<null | number>(null);
	const [chosenStudentId, setChosenStudentId] = useState<null | number>(null);
	const [deleteBookById, deleteBookByIdMutationData] = useDeleteBookByIdMutation();
	const isAdmin = meQuery?.data?.getMe?.isAdmin;

	const onDeleteBookById = (id: number) => {
		deleteBookById({variables: {bookId: id}})
			.then(allBooksQuery.refetch);
	};

	const onEditBookById = (id: number) => {
		setUpdateDrawerIsOpen(true);
		setCurrentEditId(id);
		const vars: UpdateBookMutationVariables = {name: '', count: 1, imageUrl: '', bookId: id, userId: null};
		const book = allBooksQuery.data?.getAllBooks.find(b => b.id === id);
		if (book) {
			vars['name'] = book.name;
			vars['imageUrl'] = book.imageUrl;
			vars['userId'] = book.users[0]?.id ?? null;
		}
		setCurrentUpdatingBook(vars);
	};

	const onCreateBook = () => {
		if (!currentEditedBook.name) return;
		createBook({variables: {...currentEditedBook}})
			.then(() => {
				setCreateDrawerIsOpen(false);
				allBooksQuery.refetch().catch();
			});
	};

	const onUpdateBook = () => {
		if (!currentUpdatingBook?.bookId) return;
		updateBook({variables: {...currentUpdatingBook}})
			.then(() => {
				setUpdateDrawerIsOpen(false);
				allBooksQuery.refetch().catch();
			});
	};

	if (allBooksQuery.loading) return (
		<div style={{position: 'relative', height: '100%', width: '100%'}}>
			<Loading/>
		</div>
	);

	const renderBooksList = () => {
		if (!allBooksQuery || allBooksQuery.loading) {
			return (
				<div style={{position: 'absolute', height: '100%', width: '100%'}}>
					<Loading/>
				</div>
			);
		}
		if (!allBooksQuery.data?.getAllBooks.length) {
			return (
				<div style={{padding: '24px', position: 'absolute', height: '100%', width: '100%', textAlign: 'center'}}>
					Список пуст
				</div>
			);
		}
		return (
			<Tbody>
				{
					allBooksQuery?.data?.getAllBooks.map((b) => {
						return (
							<Tr>
								<Td>{b.id}</Td>
								<Td>{b.name}</Td>
								<Td>{isAdmin ? (b.users?.[0]?.name) : (b.users?.[0] ? '' : <CheckCircleIcon color={'green'}/>)}</Td>
								{isAdmin && <Td textAlign={'end'}>
									<IconButton
										marginRight={4}
										aria-label={'Редактировать'}
										colorScheme={'blue'}
										icon={<EditIcon/>}
										onClick={() => onEditBookById(b.id)}
									/>
									<IconButton
										aria-label={'Удалить'}
										colorScheme={'red'}
										icon={<DeleteIcon/>}
										onClick={() => onDeleteBookById(b.id)}
									/>
								</Td>}
							</Tr>
						);
					})
				}
			</Tbody>
		);
	};

	const getUserNameById = (id: number) => {
		if (!allUsersQuery?.data?.getAllUsers) return '-';
		const user = allUsersQuery.data.getAllUsers.find(u => u.id === id);
		if (user) return user.name;
		return '-';
	};

	return (
		<Flex direction={'column'} gap={8}>
			{isAdmin && <Button
				leftIcon={<AddIcon/>}
				colorScheme={'green'}
				marginRight={'auto'}
				onClick={() => setCreateDrawerIsOpen(true)}
				ref={btnRef}
			>
				Добавить книгу
			</Button>}

			<Drawer
				isOpen={createDrawerIsOpen}
				placement='right'
				onClose={() => setCreateDrawerIsOpen(false)}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Добавить новую книгу</DrawerHeader>

					<DrawerBody>
						<FormLabel>Наименование</FormLabel>
						<Input
							placeholder='Введите наименование'
							value={currentEditedBook.name}
							onChange={(e) => {
								setCurrentEditedBook(prev => {
									const newState = {...prev};
									newState['name'] = e.target.value ?? '';
									return newState;
								});
							}}
						/>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={() => setCreateDrawerIsOpen(false)}>
							Отменить
						</Button>
						<Button
							colorScheme='blue'
							onClick={onCreateBook}
							disabled={!currentEditedBook.name}
							isLoading={createBookMutationData.loading}
						>
							Сохранить
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<Drawer
				isOpen={updateDrawerIsOpen}
				placement='right'
				onClose={() => setUpdateDrawerIsOpen(false)}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Редактирование книги</DrawerHeader>

					<DrawerBody>
						<FormLabel>Наименование</FormLabel>
						<Input
							placeholder='Введите наименование'
							value={currentUpdatingBook.name}
							onChange={(e) => {
								setCurrentEditedBook(prev => {
									const newState = {...prev};
									newState['name'] = e.target.value ?? '';
									return newState;
								});
							}}
						/>
						<FormLabel marginTop={4}>Студент</FormLabel>
						<Stack
							spacing={1}
						>
							<Select
								as={'button'}
								textAlign={'left'}
								placeholder={getUserNameById(currentUpdatingBook.userId)} size='lg'
								onClick={(event) => {
									event.preventDefault();
									event.stopPropagation();
									setChooseStudentDrawerIsOpen(true);
								}}
							/>
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={() => setUpdateDrawerIsOpen(false)}>
							Отменить
						</Button>
						<Button
							colorScheme='blue'
							onClick={onUpdateBook}
							disabled={!currentEditedBook.name}
							isLoading={createBookMutationData.loading}
						>
							Сохранить
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<Drawer
				isOpen={chooseStudentDrawerIsOpen}
				placement='right'
				onClose={() => {
					setChooseStudentDrawerIsOpen(false);
					setChosenStudentId(null);
				}}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Список студентов</DrawerHeader>

					<DrawerBody>
						<FormLabel>Выберите студентов из списка</FormLabel>
						<Flex direction={'column'} gap={4}>
							{allUsersQuery.data?.getAllUsers?.map(student => (
								<Button
									colorScheme={chosenStudentId === student.id ? 'blue' : 'gray'}
									onClick={() => setChosenStudentId(student.id)}
								>
									{student.name}
								</Button>
							))}
						</Flex>
					</DrawerBody>

					<DrawerFooter>
						<Button
							variant='outline'
							mr={3}
							onClick={() => {
								setChooseStudentDrawerIsOpen(false);
								setChosenStudentId(null);
							}}
						>
							Отменить
						</Button>
						<Button
							colorScheme={!chosenStudentId ? 'gray' : 'blue'}
							onClick={() => {
								setChooseStudentDrawerIsOpen(false);
								setCurrentUpdatingBook({...currentUpdatingBook, userId: chosenStudentId ?? null});
								setChosenStudentId(null);
							}}
							disabled={!chosenStudentId}
							isLoading={createBookMutationData.loading}
						>
							Выбрать студента
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<TableContainer>
				<Table size='sm'>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Наименование</Th>
							<Th>{isAdmin ? 'Студент' : 'Доступна'}</Th>
							{isAdmin && <Th> </Th>}
						</Tr>
					</Thead>
					{renderBooksList()}
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default BooksPanel;