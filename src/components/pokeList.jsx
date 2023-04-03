import React from 'react'
import { Link } from 'react-router-dom'
import PokeBackGround from '../assets/img/PokeBackGround.png'


export const PokeList = ({ pokemons, todo, images, routePath }) => {
    return (
        <div style={{
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

            <div style={{  marginBottom: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <h1>Selecciona tu Pokemon inicial</h1>
                <ul>
                    {
                        !todo ? 'Cargando...' : todo.map((poke, index) => {
                            const pokeIndex = pokemons.indexOf((poke.name))
                            const pokePathIndex = routePath[pokeIndex]
                            return <div style={{ display: 'flex' }}>
                                <li key={index} style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: '10%' }} src={[images[pokeIndex]]} alt="" />
                                    <Link to={pokePathIndex?.pokePath}>
                                        <button>{poke?.name}</button>
                                    </Link>
                                </li>
                            </div>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
