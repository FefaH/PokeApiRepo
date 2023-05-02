import React, { useEffect, useState } from 'react'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import './Pokedex.css'
import { Autocomplete, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export const Pokedex = (todoPokemons) => {
    const [takeName, setTakeName] = useState('Pikachu')
    const [takeType, setTakeType] = useState('Electric')
    const [takeImg, setTakeImg] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')
    const [todo, setTodo] = useState(null)

    const pokemonList = todoPokemons.todoPokemons.results.map((data) => {
        return {
            label: data.name,
            url: data.url,
        }
    })

    const fetchApi = async (url) => {
        try {
            const response = await fetch(url)
            const responseJSON = await response.json()
            const pokeTypes = responseJSON.types.map(item => item.type.name)
            const pokeImg = responseJSON.sprites.front_default
            setTakeImg(pokeImg)
            setTakeType(pokeTypes.join(' - '))
            setTodo(responseJSON)
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleOnChange = (e, pokeSelect) => {
        setTakeName(pokeSelect.label)
        fetchApi(pokeSelect.url)

    }

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
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
            }}>
                <Link to='/'>
                    <button>GoBack</button>
                </Link>
            </div>
            <div className="pokedex">
                <div className="screen">
                    <div className="screen-content">
                        <div className="pokemon-image">
                            <img src={takeImg} alt="Pokemon" />
                        </div>
                        <div className="pokemon-info">
                            <h2>{takeName}</h2>
                            <p>{takeType}</p>
                        </div>

                    </div>


                </div>
                <div className='autocompleteContent'>
                    <Autocomplete
                        disablePortal
                        options={pokemonList}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label='Poke' />}
                        onChange={handleOnChange}
                    />
                </div>

            </div>
        </div>
    )
}
