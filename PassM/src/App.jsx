import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen inset-0 -z-10  w-full items-center px-5  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] md:minh">
      <Manager/>
      </div>
    </>
  )
}

export default App
