import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);
  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
