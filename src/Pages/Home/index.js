import { Fragment } from 'react';
import Graph from './Graph';
import Backlog from './Backlog';
import Card from './Card';
import Clone from './Clone';
import './_Home.scss';

export default function Home() {
  return (
    <Fragment>
      <div className='title'>
        <h2>Shipit 53</h2>
      </div>
      <section className='splice'>
        <Graph />
        <Backlog />
      </section>
      <Card />
      <Clone />
    </Fragment>
  );
}