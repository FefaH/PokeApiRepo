import React from 'react'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import './Pokedex.css'
import { Autocomplete, TextField } from '@mui/material'

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
]

export const Pokedex = (todoPokemons) => {
    console.log('todoPokemons: ', todoPokemons)

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
            <div class="pokedex">
                <div class="screen">
                    <div class="screen-content">
                        <div class="pokemon-image">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" />
                        </div>
                        <div class="pokemon-info">
                            <h2>Pikachu</h2>
                            <p>Electric Type</p>
                        </div>

                    </div>
                    

                </div>
                <Autocomplete
                        disablePortal
                        options={top100Films}
                        sx={{ width: 100 }}
                        renderInput={(params) => <TextField {...params} label='Poke' />}
                    />
            </div>
        </div>
    )
}
