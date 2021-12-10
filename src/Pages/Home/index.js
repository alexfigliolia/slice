import Graph from './Graph';
import Backlog from './Backlog';
import Card from './Card';
import './_Home.scss';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <div className='title'>
        <h2>Shipit 53</h2>
      </div>
      <section className='slice'>
        <Graph />
        <Backlog />
      </section>
      <Card />
    </Fragment>
  );
}