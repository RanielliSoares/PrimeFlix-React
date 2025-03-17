import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';
import api from "../../services/api";

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "61b7a5673bbd8d3dc5ed56d2b22d1baa",
                    language: "pt-BR",
                    page: 1,
                }
            })
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }
        loadFilmes();
        
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando Filmes...</h1>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}

            </div>
        </div>
    )
}
export default Home;