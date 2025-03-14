import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RootLayout from './layout/RootLayout'
import WalletLayout from './layout/WalletLayout'
import Home from './pages/Home'
import Wallet from './pages/Wallet'
import Done from './pages/Done'


function App() {
    const router = createBrowserRouter(
        createRoutesFromElements (
            <Route path='/' element={<RootLayout />}>
                <Route index element={<Home />}/>
                <Route path='wallet' element={<WalletLayout />}>
                  <Route index element={<Wallet />}/>
                  <Route path='done' element={<Done />} />
                </Route>
            </Route>
        )
    )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
