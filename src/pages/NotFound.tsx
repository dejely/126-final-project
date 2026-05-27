import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const Error = () => {
    return(
        <div className="not-found">
            <Header/>
            <main className="placeholder-page">
                <p className="placeholder-page__eyebrow">404</p>
                <h1>Page not found</h1>
                <p>The page you opened does not exist in AniGuess.</p>
                <Link to="/" className="button">Back Home</Link>
            </main>
            <Footer/>
        </div>
    );
}

export default Error;
