import {CheckCircleIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import React from 'react';
import {useGetMeQuery} from '../gql';
import Loading from './Loading';

const MyBooksPanel = () => {
	const meQuery = useGetMeQuery();

	const renderBooksList = () => {
		if (meQuery.loading || !meQuery.data?.getMe?.books) {
			return (
				<div style={{position: 'absolute', height: '100%', width: '100%'}}>
					<Loading/>
				</div>
			);
		}
		if (!meQuery.data?.getMe?.books.length) {
			return (
				<div style={{padding: '24px', position: 'absolute', height: '100%', width: '100%', textAlign: 'center'}}>
					Список пуст
				</div>
			);
		}
		return (
			<Tbody>
				{
					meQuery.data?.getMe?.books?.map((b) => {
						return (
							<Tr>
								<Td>{b.id}</Td>
								<Td>{b.name}</Td>
							</Tr>
						);
					})
				}
			</Tbody>
		);
	};

	return (
		<TableContainer>
			<Table size='sm'>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Наименование</Th>
					</Tr>
				</Thead>
				{renderBooksList()}
			</Table>
		</TableContainer>
	);
};

export default MyBooksPanel;