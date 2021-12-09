import Graph from './Graph';
import Backlog from './Backlog';
import './_Home.scss';

export default function Home() {
  return (
    <section className='splice'>
      <Graph />
      <Backlog />
    </section>
  );
}