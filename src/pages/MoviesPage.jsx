import { useState } from 'react'
import { movies as initialMovies } from '../utils/movies'

function MoviesPage() {
  const [movies, setMovies] = useState(initialMovies)
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [genre, setGenre] = useState('')
  const [watched, setWatched] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = () => {
    if (title.trim() === '') {
      setError('Title cannot be empty.')
      return
    }
    if (director.trim() === '') {
      setError('Director cannot be empty.')
      return
    }

    setError('')

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      director: director.trim(),
      genre: genre.trim(),
      watched: watched,
    }

    setMovies([...movies, newMovie])
    setTitle('')
    setDirector('')
    setGenre('')
    setWatched(false)
  }

  const handleToggleWatched = (id) => {
    setMovies(movies.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ))
  }

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>

      <div className="mb-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border border-gray-200 rounded p-4 mb-3 flex items-center justify-between"
          >
            <div>
              <h2 className="font-bold text-lg">{movie.title}</h2>
              <p className="text-sm text-gray-600">Director: {movie.director}</p>
              <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
              <p className="text-sm">
                Status:{' '}
                <span className={movie.watched ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                  {movie.watched ? 'Watched' : 'Not Watched'}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => handleToggleWatched(movie.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              >
                Toggle Watched
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-300 rounded p-6">
        <h2 className="text-xl font-bold mb-4">Add New Movie</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Director</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
            id="watched"
          />
          <label htmlFor="watched" className="text-sm font-medium">Watched</label>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Movie
        </button>
      </div>
    </div>
  )
}

export default MoviesPage