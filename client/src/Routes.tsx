import { Routes as ReactRouter, Route } from 'react-router-dom';
import { lazy } from 'react';

import Loadable from '@/components/Loadable';

const HomePage = Loadable(lazy(() => import('@/pages/HomePage')));

const Routes = () => {
  return (
    <ReactRouter>
      <Route path='/'>
        <Route index element={<HomePage />} />
      </Route>
    </ReactRouter>
  );
};

export default Routes;
