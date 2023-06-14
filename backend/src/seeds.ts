require('dotenv').config({ path: '.env' });
require('module-alias/register');

import { db } from '@data/index';
import { posts } from '@data/schemas';

const createPosts = async () => {
  const items = [
    {
      title: 'Item 1',
      description:
        'Sed vitae mauris posuere, vehicula orci a, ultricies tellus. Donec gravida ipsum a mi dapibus, eu luctus justo lacinia.',
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    },
    {
      title: 'Item 2',
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    },
    {
      title: 'Item 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque augue in lacus eleifend, in suscipit odio vulputate.',
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    },
    {
      title: 'Item 4',
      description:
        'Nullam tristique metus eu diam malesuada aliquet. Suspendisse ac est non erat gravida lobortis.',
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    },
    {
      title: 'Item 5',
      description:
        'Maecenas eu felis maximus, venenatis enim sed, rhoncus velit. In auctor lacus quis mi aliquet rhoncus.',
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    },
  ];

  try {
    await db.insert(posts).values(items);
  } catch (err) {
    console.error('Seeds Failed', err);
  }
};

createPosts();
