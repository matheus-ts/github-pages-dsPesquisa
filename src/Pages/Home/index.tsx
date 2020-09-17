import React from 'react';
import './styles.css';

import { ReactComponent as ArrowIcon } from '../../assets/Seta.svg';

import { ReactComponent as GamerImg } from '../../assets/GAMER.svg';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-text">
                <h1 className="home-text-title">
                    Quais jogos a galera gosta mais ?
                </h1>
                <h3 className="home-text-subtitle">
                    Clique no botão abaixo e saiba quais são os jogos que os gamers estão escolhendo!
                </h3>
                <Link to="/records">
                    <div className="home-actions">
                        <button className="home-btn">
                            Quero saber quais são
                    </button>
                        <div className="home-btn-icon">
                            <ArrowIcon />
                        </div>
                    </div>
                </Link>
            </div>

            <GamerImg className="home-image" />
        </div>
    )
}

export default Home;