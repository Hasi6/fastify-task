import { ReviewZ } from '@/models/review';
import { Rating } from '@mantine/core';
import { FC } from 'react';

interface Props {
  review: ReviewZ;
}

const Comment: FC<Props> = ({ review }) => {
  return (
    <div className='my-[15px] border-b-[2px] pb-[5px]'>
      <span className='ml-[5px] font-bold'>{review.text}</span>
      <Rating value={review.rate} readOnly={true} />
    </div>
  );
};

export default Comment;
