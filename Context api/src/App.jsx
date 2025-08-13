import './App.css'
import Themeprovider from './Components/Themeprovider'
import { useContext } from 'react';
import ThemeContext from './Components/Context api/Themecontext';
import Home from './Components/Home';




function App() {

const { name , count , setCount } = useContext(ThemeContext);
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-[40vh] flex flex-col items-center justify-center shadow-lg">
  <h1 className="text-5xl font-extrabold text-center py-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg hover:scale-105 transition-transform duration-300">
    Welcome to the Theme Context API Example
  </h1>
  <p className="text-center text-xl font-medium text-gray-700 mt-4 animate-fade-in">Hello, {name}!</p>
  <p className="text-center text-xl font-medium text-gray-700 mt-4 mb-2 animate-fade-in" >Here Name printed about is coming with help of context api</p>
  </div>



        <div className="max-w-4xl mx-auto my-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md">
      <p className="text-lg text-gray-700 mb-6 font-medium italic">
        This is the Home component which is also using context api , here we tried to access the context values in other components
      </p>
      <div className="border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition duration-300">
        <Home/>
      </div>
       </div>




      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Counter using Context API</h2>
        <p className='text-center text-3xl font-bold text-indigo-600 mb-6'>Current Count: {count}</p>
        <div className="flex justify-center gap-4">
          <button 
            className='px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-200' 
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button 
            className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200' 
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>

          <button className='px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200' onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
      </>
   
  )
}

export default App
