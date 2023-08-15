import { Link, useRouteError } from 'react-router-dom';
import Header from './Header';

export default function ErrorPage() {

    const error = useRouteError();

    console.log(error);

    return (
        <>
            <Header />
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2>
            <p>You probably want to be somewhere else. Go <Link to="/">home</Link>?</p>
            <img src="/ja-tuchka-tuchka.jpg" alt="Winnie the Pooh holds tight to a blue balloon as an angry swarm of bees approaches."/>
        </>
    )
}