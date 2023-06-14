import { useState } from 'react';
import { Select } from '@mantine/core';

import Post from '@/components/Post';
import Spinner from '@/components/Spinner';
import { useQuery } from '@/hooks/useQuery';
import { PostZ } from '@/models/post';
import { API_ROUTES } from '@/utils/constants';

const HomePage = () => {
  const [sort, setSort] = useState('DESC');

  const { data, loading, retry } = useQuery<PostZ[]>({
    url: `${API_ROUTES.POSTS.ALL}?sort=${sort}`,
  });

  console.log(data);

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        {!loading ? (
          <>
            <Select
              className='w-[400px] mx-auto mt-[20px]'
              placeholder='Sort'
              data={[
                { value: 'ASC', label: 'low-to-high' },
                { value: 'DESC', label: 'high-to-low' },
              ]}
              value={sort}
              onChange={(e) => setSort(e as string)}
            />
            <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
              {data?.map((post) => (
                <Post key={post.id} post={post} onClose={retry} />
              ))}
            </div>
          </>
        ) : (
          <Spinner size={32} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
