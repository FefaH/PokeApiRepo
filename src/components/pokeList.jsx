import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PokeBackGround from '../assets/img/PokeBackGround.png'
import pokeball from '../assets/img/pokeball.png'



export const PokeList = ({ pokemons, todo, images, routePath, confirmPokemonName, handleConfirmPokemon, test }) => {
    const [pokeRelease, setPokeRelease] = useState(confirmPokemonName)
    const handlePokeRelease = () => {
        setPokeRelease('')
        handleConfirmPokemon(false)
        test('')
    }
    console.log('pokeRelease: ', pokeRelease)
    console.log('confirmPokemonName: ', confirmPokemonName)

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

            <div style={{ marginBottom: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
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
                                    {
                                        poke?.name === pokeRelease &&
                                        <div style={{ marginLeft: '20px' }}>
                                            <img src={pokeball} onClick={handlePokeRelease}/>
                                        </div>
                                    }
                                </li>
                            </div>
                        })
                    }
                    {
                        pokeRelease &&
                        <>
                            <div class="dialog-box">
                                <div class="dialog-box-content">
                                    <p>Hello, trainer! How can I assist you?</p>
                                </div>
                                <div class="dialog-box-actions">
                                    <button class="dialog-box-action">Fight</button>
                                    <button class="dialog-box-action">Bag</button>
                                    <button class="dialog-box-action">Pokémon</button>
                                    <button class="dialog-box-action">Run</button>
                                </div>
                            </div>
                        </>
                    }

                </ul>
            </div>
        </div>
    )
}
