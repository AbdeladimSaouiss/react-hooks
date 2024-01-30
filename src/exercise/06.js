// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemmon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [state, setState] = React.useState('idle')

  React.useEffect(() => {
    if (pokemonName) {
      setPokemmon(null)
      setState('pending')
      fetchPokemon(pokemonName).then(
        pokemonData => {
          setState('resolved')
          setPokemmon(pokemonData)
        },
        error => {
          setState('rejected')
          setError(error)
        },
      )
    }
  }, [pokemonName])

  // if (error) {
  if (state === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  // if (!pokemonName) {
  if (state === 'idle') {
    return 'Submit a pokemon'
  }

  // if (!pokemon && pokemonName) {
  if (state === 'pending') {
    return <PokemonInfoFallback name="pokemonName" />
  }

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
