import React, { useEffect, useState } from 'react'
import './Charmander.css'
import charmander from '../../assets/img/charmander.gif'
import charmeleon from '../../assets/img/charmeleon.gif'
import charizard from '../../assets/img/charizard.gif'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import { Link } from 'react-router-dom'

export const Charmander = ({ todo, evolvData }) => {

    const [takeCharmander, setTakeCharmander] = useState(null)
    const [showEvolution, setShowEvolution] = useState('charmander')
    const [statsList, setStatsList] = useState({
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    })

   

    let urlCharmander = todo?.find((name) => name?.name === 'charmander')
    let urlCharmeleon = evolvData?.find((name) => name?.name === 'charmeleon')
    let urlCharizard = evolvData?.find((name) => name?.name === 'charizard')
    
    const fetchApi = async () => {
        try {
            const response = await fetch(urlCharmander?.url)
            const responseJSON = await response.json()
            setTakeCharmander(responseJSON)
        } catch (error) {
            console.log('error: ', error)
        }
    }
    //Fetch para evolucionar Charmander
    const fetchApiEvolve = async (url) => {
        try {
            const response = await fetch(url)
            const responseJSON = await response.json()
            setTakeCharmander(responseJSON)
        } catch (error) {
            console.log('error: ', error)
        }
    }
    const handleEvolve = () => {
        fetchApiEvolve(urlCharmeleon.url)
        setShowEvolution('charmeleon')
    }

    const handleInvolution = () => {
        fetchApiEvolve(urlCharmander.url)
        setShowEvolution('charmander')
    }
    const handleCharizard = () => {
        fetchApiEvolve(urlCharizard.url)
        setShowEvolution('charizard')
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
                        {
                            showEvolution === 'charmander' && <img src={charmander} alt="Charmander" />
                            
                        }
                        {
                            showEvolution === 'charmeleon' && <img src={charmeleon} alt="charmeleon" />
                        }
                        {
                            showEvolution === 'charizard' && <img src={charizard} alt="charizard" />
                        }
                        
                    </div>
                    <button onClick={() => handleInvolution()}>Charmander</button>
                    <button onClick={() => handleEvolve()}>Charmeleon</button>
                    <button onClick={() => handleCharizard()}>Charizard</button>
                </div>
                <div className="poke-stats">
                    <div className="stat-container">
                        <div className="stat-title">HP</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.hp}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.hp}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Attack</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.attack}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.attack}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Defense</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.defense}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.defense}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Sp. Atk</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.specialAttack}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.specialAttack}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Sp. Def</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.specialDefense}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.specialDefense}</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat-title">Speed</div>
                        <div className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${statsList.speed}%` }}></div>
                        </div>
                        <div className="stat-value">{statsList.speed}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
