import React, { useEffect, useState } from 'react'
import './Charmander.css'
import charmander from '../../assets/img/charmander.gif'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import { Link } from 'react-router-dom'

export const Charmander = ({ todo }) => {

    const [takeCharmander, setTakeCharmander] = useState(null)
    const [statsList, setStatsList] = useState({
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    })

    let urlCharmander = todo?.find((name) => name?.name === 'charmander')
    const fetchApi = async () => {
        try {
            const response = await fetch(urlCharmander?.url)
            const responseJSON = await response.json()
            setTakeCharmander(responseJSON)
        } catch (error) {
            console.log('error: ', error)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    useEffect(() => {
        if (takeCharmander) {
            takeCharmander?.stats?.forEach(stats => {
                switch (stats?.stat?.name) {
                    case 'hp':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            hp: stats?.base_stat
                        }))
                        break;
                    case 'attack':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            attack: stats?.base_stat
                        }))
                        break;
                    case 'defense':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            defense: stats?.base_stat
                        }))
                        break;
                    case 'special-attack':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            specialAttack: stats?.base_stat
                        }))
                        break;
                    case 'special-defense':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            specialDefense: stats?.base_stat
                        }))
                        break;
                    case 'speed':
                        setStatsList((prevStat) => ({
                            ...prevStat,
                            speed: stats?.base_stat
                        }))
                        break;
                }
            })
        }

    }, [takeCharmander])

    return (
        <div className="poke-container" style={{
            height: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${PokeBackGround})`,
            backgroundSize: 'cover',
        }}>
            <div className="poke-info">

                <div className="poke-header">
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                    }}>
                        <Link to='/'>
                            <button>GoBack</button>
                        </Link>
                    </div>

                    <h2>Charmander</h2>
                    <p>The Lizard Pokémon</p>
                    <div className="poke-image">
                        <img src={charmander} alt="Charmander" />
                    </div>
                </div>
                <div className="poke-stats">
                    <div className="stat-container">
                        <div className="stat-title">HP</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '39%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.hp}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Attack</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '60%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.attack}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Defense</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '50%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.defense}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Sp. Atk</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '70%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.specialAttack}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Sp. Def</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '60%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.specialDefense}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Speed</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: '80%' }}></div>
                        </div>
                        <div className="stat-value">{statsList.speed}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
