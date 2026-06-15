import './App.css'
import { Header, Hero } from './components';
import { Carousel } from './components/Car';

function App() {
  return (
    <>
      <Header />
      <main className='main-content'>
        <Carousel />
      </main>
      <Hero />
    </>
  )
}

export default App
