
import './App.css'
import AddCommission from './components/add-commission/AddCommission'
import Commissions from './components/commissions/Commissions'
import Sidebar from './components/sidebar/Sidebar'


function App() {


  return (
    <div className="paddings App">
        <Sidebar/>
        <AddCommission/>

    </div>
  )
}

export default App
