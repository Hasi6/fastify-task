import { Modal } from '@mantine/core';
import { FC } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { API_ROUTES } from '@/utils/constants';
import Spinner from '@/components/Spinner';
import { ReviewZ } from '@/models/review';
import { PostZ } from '@/models/post';
import FeedBack from '@/components/Feedback';
import Comment from '@/components/Comment';

interface Props {
  post: PostZ;
  onClose: () => void;
}

const Reviews: FC<Props> = ({ post, onClose }) => {
  const { data, loading, retry } = useQuery<ReviewZ[]>({
    url: API_ROUTES.REVIEWS.POST_ID.replace('#{post_id}', post.id),
  });

  const handleAfterAddReview = async () => {
    await retry();
  };

  return (
    <Modal opened={true} onClose={onClose} size={'xl'} title={post.title}>
      <div className='mx-auto mb-[20px]'>
        {loading ? (
          <Spinner size={32} />
        ) : (
          <>
            <FeedBack onAfterAdd={handleAfterAddReview} postId={post.id} />
            {data?.map((review) => (
              <Comment review={review} key={review.id} />
            ))}
            {!loading && data?.length === 0 && (
              <div className='font-bold mt-[20px] mx-auto w-full text-center'>
                No Reviews Found
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default Reviews;
