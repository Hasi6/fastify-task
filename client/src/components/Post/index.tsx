import { FC, useState } from 'react';
import { Button, Rating } from '@mantine/core';

import { PostZ } from '@/models/post';
import Reviews from '@/components/Reviews';

interface Props {
  post: PostZ;
  onClose: () => void;
}

const Post: FC<Props> = ({ post, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='rounded overflow-hidden shadow-lg relative pb-[60px]'>
      {isOpen && (
        <Reviews
          post={post}
          onClose={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      )}
      <img className='max-w-[400px]' src={post.image} alt='Mountain' />
      <div className='py-4'>
        <div className='px-4 font-bold text-xl mb-2'>{post.title}</div>
        <p className='px-4 text-gray-700 text-base max-w-[400px]'>
          {post.description}
        </p>
        <Rating
          className='mx-[10px] mt-[5px]'
          value={parseInt(post.average_rate)}
          readOnly={true}
        />

        <Button
          className='mx-[10px] mt-[15px] bg-blue-500 absolute bottom-[20px]'
          onClick={() => setIsOpen(true)}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default Post;
