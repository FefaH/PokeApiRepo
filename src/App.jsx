import { useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import charmander from './assets/img/charmander.gif'
import squirtle from './assets/img/squirtle.gif'
import bulbasaur from './assets/img/bulbasaur.gif'
import { PokeList } from './components/pokeList'
import { Charmander } from './components/pokemons/Charmander'
import { Bulbasaur } from './components/pokemons/Bulbasaur'
import { Squirtle } from './components/pokemons/Squirtle'
import { Pokedex } from './components/pokedex/Pokedex'

const pokemons = ['charmander', 'squirtle', 'bulbasaur']
const images = [charmander, squirtle, bulbasaur]
const routePath = [
  { id: 0, pokePath: '/Charmander' },
  { id: 1, pokePath: '/Squirtle' },
  { id: 2, pokePath: '/Bulbasaur' },
  { id: 3, pokePath: '/Pokedex' },
]



function App() {
  const [todoInitial, setTodoInitial] = useState()
  const [todoPokemons, setTodoPokemons] = useState()
  const [evolvData, setEvolvData] = useState()
  const [confirmPokemon, setconfirmPokemon] = useState(false)
  const [confirmPokemonName, setConfirmPokemonName] = useState('')
  const [statsSelectPokemon, setStatsSelectPokemon] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  })
  const test = ((data) => {
    setConfirmPokemonName(data)
  })
  const urlInitial = 'https://pokeapi.co/api/v2/pokemon';
  const urlTodoPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
  const handleTakeData = ((data) => {
    setStatsSelectPokemon(data)
  })
  const handleTakeName = ((data) => {
    setConfirmPokemonName(data)
  })
  const handleConfirmPokemon = ((data) => {
    setconfirmPokemon(data)
  })

  const fetchApi = async () => {
    const response = await fetch(urlInitial)
    const responseAll = await fetch(urlTodoPokemons)
    const responseJSON = await response.json()
    const responseAllJSON = await responseAll.json()
    const pokeEvolv = responseJSON.results.filter(name =>
      name.name === 'charmeleon' ||
      name.name === 'charizard' ||
      name.name === 'wartortle' ||
      name.name === 'blastoise' ||
      name.name === 'ivysaur' ||
      name.name === 'venusaur'
    )
    const initialPokemons = responseJSON.results.filter(name =>
      name.name === 'charmander' ||
      name.name === 'squirtle' ||
      name.name === 'bulbasaur'
    )
    setTodoInitial(initialPokemons)
    setEvolvData(pokeEvolv)
    setTodoPokemons(responseAllJSON)
  }

  console.log('eteconfirmPokemonName: ', confirmPokemonName)

  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <BrowserRouter>
      <div>
        <div>
          <Routes>
            {
              todoInitial ? (
                <Route
                  path={'/'}
                  element={
                    <PokeList
                    todoInitial={todoInitial}
                      images={images}
                      pokemons={pokemons}
                      routePath={routePath}
                      confirmPokemonName={confirmPokemonName}
                      handleConfirmPokemon={handleConfirmPokemon}
                      test={test}
                    />}
                />
              ) : (
                'Loading...'
              )
            }
            <Route
              path={'/Charmander'}
              element={
                <Charmander
                todoInitial={todoInitial}
                  evolvData={evolvData}
                  handleTakeData={handleTakeData}
                  handleTakeName={handleTakeName}
                  handleConfirmPokemon={handleConfirmPokemon}
                  confirmPokemon={confirmPokemon}
                />}
            />
            <Route
              path={'/Bulbasaur'}
              element={
                <Bulbasaur
                todoInitial={todoInitial}
                  evolvData={evolvData}
                  handleTakeData={handleTakeData}
                  handleTakeName={handleTakeName}
                  handleConfirmPokemon={handleConfirmPokemon}
                  confirmPokemon={confirmPokemon}
                />}
            />
            <Route
              path={'/Squirtle'}
              element={
                <Squirtle
                todoInitial={todoInitial}
                  evolvData={evolvData}
                  handleTakeData={handleTakeData}
                  handleTakeName={handleTakeName}
                  handleConfirmPokemon={handleConfirmPokemon}
                  confirmPokemon={confirmPokemon}
                />}
            />
            <Route
            path={'/Pokedex'}
            element={
              <Pokedex todoPokemons={todoPokemons}/>
            }
            
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
