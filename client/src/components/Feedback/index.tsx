import { FC, useState } from 'react';
import { Button, Rating, Textarea } from '@mantine/core';

import { useMutation } from '@/hooks/useMutate';
import { toast } from 'react-toastify';
import { API_ROUTES } from '@/utils/constants';

interface Props {
  onAfterAdd: () => void;
  postId: string;
}

const FeedBack: FC<Props> = ({ onAfterAdd, postId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const { loading, mutate } = useMutation({
    url: API_ROUTES.REVIEWS.ADD,
  });

  const addReview = async () => {
    try {
      const res = await mutate({ rate: rating, text: comment, postId });

      if (res.success) {
        onAfterAdd();
      } else {
        toast.error('Sometihing went wrong, Please try again');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='mx-auto'>
      <Rating value={rating} onChange={setRating} />
      <Textarea
        className='my-[20px]'
        placeholder='Add Your Comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        className='bg-blue-500 w-full'
        disabled={!comment || loading}
        onClick={addReview}
      >
        Add Review
      </Button>
    </div>
  );
};

export default FeedBack;
