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

const pokemons = ['charmander', 'squirtle', 'bulbasaur']
const images = [charmander, squirtle, bulbasaur]
const routePath = [
  { id: 0, pokePath: '/Charmander' },
  { id: 1, pokePath: '/Squirtle' },
  { id: 2, pokePath: '/Bulbasaur' },
]



function App() {
  const [todo, setTodo] = useState()
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
  const url = 'https://pokeapi.co/api/v2/pokemon';
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
    const response = await fetch(url)
    const responseJSON = await response.json()
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
    setTodo(initialPokemons)
    setEvolvData(pokeEvolv)
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
              todo ? (
                <Route
                  path={'/'}
                  element={
                    <PokeList
                      todo={todo}
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
                  todo={todo}
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
                  todo={todo}
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
                  todo={todo}
                  evolvData={evolvData}
                  handleTakeData={handleTakeData}
                  handleTakeName={handleTakeName}
                  handleConfirmPokemon={handleConfirmPokemon}
                  confirmPokemon={confirmPokemon}
                />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
