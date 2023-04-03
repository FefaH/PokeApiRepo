import React, { useEffect, useState } from 'react'
import PokeBackGround from '../../assets/img/PokeBackGround.png'
import { Link } from 'react-router-dom'
import squirtle from '../../assets/img/squirtle.gif'


export const Squirtle = ({ todo }) => {
  const [takeSquirtle, setTakeSquirtle] = useState(null)
  const [statsList, setStatsList] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  })

  let urlSquirtle = todo?.find((name) => name?.name === 'squirtle')
  const fetchApi = async () => {
    try {
      const response = await fetch(urlSquirtle.url)
      const responseJSON = await response.json()
      setTakeSquirtle(responseJSON)
    } catch (error) {
      console.log('error: ', error)
    }

  }
  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    if (takeSquirtle) {
      takeSquirtle?.stats?.forEach(stats => {
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

  }, [takeSquirtle])
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

          <h2>Squirtle</h2>
          <p>The Tiny Turtle Pokémon</p>
          <div className="poke-image">
            <img src={squirtle} alt="poke" />
          </div>
        </div>
        <div className="poke-stats">
          <div className="stat-container">
            <div className="stat-title">HP</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '44%' }}></div>
            </div>
            <div className="stat-value">{statsList.hp}</div>
          </div>
          <div className="stat-container">
            <div className="stat-title">Attack</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '48%' }}></div>
            </div>
            <div className="stat-value">{statsList.attack}</div>
          </div>
          <div className="stat-container">
            <div className="stat-title">Defense</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '65%' }}></div>
            </div>
            <div className="stat-value">{statsList.defense}</div>
          </div>
          <div className="stat-container">
            <div className="stat-title">Sp. Atk</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '50%' }}></div>
            </div>
            <div className="stat-value">{statsList.specialAttack}</div>
          </div>
          <div className="stat-container">
            <div className="stat-title">Sp. Def</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '64%' }}></div>
            </div>
            <div className="stat-value">{statsList.specialDefense}</div>
          </div>
          <div className="stat-container">
            <div className="stat-title">Speed</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: '43%' }}></div>
            </div>
            <div className="stat-value">{statsList.speed}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
