import { Fragment } from 'react';
import Home from 'Pages/Home';
import Header from 'Components/Header';
import { useScreen } from 'Hooks/Screen';

export default function App() {
  useScreen();
  return (
    <Fragment>
      <Header />
      <Home />
    </Fragment>
  );
}
