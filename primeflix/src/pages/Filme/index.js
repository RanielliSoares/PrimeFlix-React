import { useEffect, useState } from 'react';
import { useParams, useNavigate, replace } from 'react-router-dom';

import api from '../../services/api';
import './filme.css';
function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "61b7a5673bbd8d3dc5ed56d2b22d1baa",
                    language: "pt-BR"
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    navigate('/',{replace: true});
                    return;

                });
        }
        loadFilme();


        return () => {
            console.log("Componente desmontado");
        }
    }, [navigate,id]);

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando Filme...</h1>
            </div>
        )}

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target='_blank' rel='external'>
                    Trailer</a>
                </button>
            </div>
        </div>
    );
}
export default Filme;