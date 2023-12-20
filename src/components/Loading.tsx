import {Flex, Spinner} from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
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
};

export default Loading;