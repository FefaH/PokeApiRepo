import React, { useEffect, useState } from 'react'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import { Link } from 'react-router-dom'
import bulbasaur from '../../assets/img/bulbasaur.gif'
import ivysaur from '../../assets/img/ivysaur.gif'
import venusaur from '../../assets/img/venusaur.gif'
import leafdna from '../../assets/img/leafdna.png'

export const Bulbasaur = ({ todo, evolvData, handleTakeData, handleConfirmPokemon, confirmPokemon, handleTakeName }) => {
  const [takeBulbasaur, setTakeBulbasaur] = useState(null)
  const [showEvolution, setShowEvolution] = useState('bulbasaur')
  const [statsList, setStatsList] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  })

  let urlBulbasaur = todo?.find((name) => name?.name === 'bulbasaur')
  let urlIvysaur = evolvData?.find((name) => name?.name === 'ivysaur')
  let urlVenusaur = evolvData?.find((name) => name?.name === 'venusaur')
  const fetchApi = async () => {
    try {
      const response = await fetch(urlBulbasaur?.url)
      const responseJSON = await response.json()
      setTakeBulbasaur(responseJSON)
    } catch (error) {
      console.log('error: ', error)
    }

  }

  const fetchApiEvolve = async (url) => {
    try {
      const response = await fetch(url)
      const responseJSON = await response.json()
      setTakeBulbasaur(responseJSON)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleEvolve = () => {
    fetchApiEvolve(urlIvysaur.url)
    setShowEvolution('ivysaur')
  }

  const handleInvolution = () => {
    fetchApiEvolve(urlBulbasaur.url)
    setShowEvolution('bulbasaur')
  }
  const handleBlastoise = () => {
    fetchApiEvolve(urlVenusaur.url)
    setShowEvolution('venusaur')
  }
  const handlePokeSelect = () => {
    let pokeSelectData = statsList
    handleTakeData(pokeSelectData)
    if (pokeSelectData) {
      handleConfirmPokemon(true)
      handleTakeName(showEvolution)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  useEffect(() => {
    if (takeBulbasaur) {
      takeBulbasaur?.stats?.forEach(stats => {
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

  }, [takeBulbasaur])
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
          <div>
            {
              showEvolution === 'bulbasaur' ?
                <button className={!confirmPokemon ? 'pokemon-button' : 'pokemon-button-disabled'} onClick={handlePokeSelect} disabled={confirmPokemon}>Select</button> :
                <button className={'pokemon-button-disabled'} disabled={confirmPokemon}>Select</button>
            }

          </div>
          <h2>Bulbasaur</h2>
          <p>The Seed Pokémon</p>
          <div className="poke-image">
            {
              showEvolution === 'bulbasaur' && <img src={bulbasaur} alt="poke" />
            }
            {
              showEvolution === 'ivysaur' && <img src={ivysaur} alt="poke" />
            }
            {
              showEvolution === 'venusaur' && <img src={venusaur} alt="poke" />
            }
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <img onClick={() => handleInvolution()} src={leafdna} alt="" style={{margin: '20px', cursor: 'pointer'}} />
            <img onClick={() => handleEvolve()} src={leafdna} alt="" style={{margin: '20px', cursor: 'pointer'}} />
            <img onClick={() => handleBlastoise()} src={leafdna} alt="" style={{margin: '20px', cursor: 'pointer'}} />
          </div>

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
