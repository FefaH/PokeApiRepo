import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PokeBackGround from '../assets/img/PokeBackGround.png'
import pokeball from '../assets/img/pokeball.png'
import pokeballOpen from '../assets/img/pokeballOpen.png'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';



export const PokeList = ({ pokemons, todoInitial, images, routePath, confirmPokemonName, handleConfirmPokemon, test }) => {
    const [pokeRelease, setPokeRelease] = useState(confirmPokemonName)
    const [mouseOver, setMouseOver] = useState(false)
    const handleMouseOver = () => {
        setMouseOver(true)
    }
    const handleMouseOut = () => {
        setMouseOver(false)
    }
    const handlePokeRelease = () => {
        setPokeRelease('')
        handleConfirmPokemon(false)
        test('')
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
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
                        !todoInitial ? 'Cargando...' : todoInitial.map((poke, index) => {
                            const pokeIndex = pokemons.indexOf((poke.name))
                            const pokePathIndex = routePath[pokeIndex]
                            return <div style={{ display: 'flex' }}>
                                <li key={index} style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: '10%' }} src={[images[pokeIndex]]} alt="" />
                                    <Link to={pokePathIndex?.pokePath}>
                                        <button className='pokeButton'>{capitalizeFirstLetter(poke?.name)}</button>
                                    </Link>
                                    {
                                        poke?.name === pokeRelease &&
                                        <div style={{ marginLeft: '20px' }}>
                                            <Tooltip title={`Solatar a ${capitalizeFirstLetter(poke.name)}?`} placement="right-start">
                                                <IconButton>
                                                    <img src={mouseOver ? pokeballOpen : pokeball} onClick={handlePokeRelease} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                                                </IconButton>
                                            </Tooltip>
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
                                    <button class="dialog-box-action">Pokedex</button>
                                    <button class="dialog-box-action">Bag</button>
                                    <button class="dialog-box-action">Pokémon</button>
                                    <button class="dialog-box-action">Run</button>
                                </div>
                            </div>
                        </>
                    }
                    <Link to='/Pokedex'>
                        <div>Pokedex</div>
                    </Link>


                </ul>
            </div>
        </div>
    )
}
