import { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FullScreenLoader from 'Components/FullScreenLoader';
import { useScreen } from 'Hooks/Screen';

const Home = lazy(() => import('Pages/Home'));

export default function App() {
  useScreen();
  return (
    <Fragment>
      <Suspense fallback={<FullScreenLoader />}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}
