import { Link, useRouteError } from 'react-router-dom';
import Header from './Header';

export default function ErrorPage() {

    const error = useRouteError();


    return (
        <>
            <div className="error-page">
                <img className="error-img" src="/ja-tuchka-tuchka.jpg" alt="Winnie the Pooh holds tight to a blue balloon as an angry swarm of bees approaches."/>
                <div className="error-text-div">
                    <h1>{error.status}</h1>
                    <h2>{error.statusText}</h2>
                    <p>You probably want to be somewhere else. Go <Link to="/">home</Link>?</p>
                </div>
            </div>
        </>
    )
}