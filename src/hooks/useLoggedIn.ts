import {useGetMeQuery} from '../gql';

export const useLoggedIn = () => {
	const meQuery = useGetMeQuery({fetchPolicy: 'cache-only'});
	return !!meQuery?.data?.getMe && meQuery.called && !meQuery.error;
}