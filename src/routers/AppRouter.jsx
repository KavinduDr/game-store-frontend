import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Error, ViewGameAll, ViewGameDetails, ViewStoreAll, ViewStoreDetails, ViewCreatorAll } from '../views/index';
import BaseLayout from "../layouts/BaseLayout";
import Signup from "../components/Singup";
import Login from "../components/Login";
import Cart from "../components/cart/Cart";
import CheckOut from '../components/checkOut/CheckOut';
import AdminPage from '../components/admin/Admin';
import EditUser from '../components/Edit/EditUser';

const AppRouter = () => {
  const user = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("Hello");
  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path = "/" element = { <BaseLayout /> }>
          <Route path = "/" element = { <Home /> } />
          <Route path = "/error" element = { <Error /> } />
          <Route path = "/games" element = { <ViewGameAll /> } />
          <Route path = "/games/:gameId" element={<ViewGameDetails />} />
          <Route path = "/stores" element={<ViewStoreAll />} />
          <Route path = "/stores/:storeId" element={<ViewStoreDetails />} />
          <Route path = "/creators" element = { <ViewCreatorAll />} />
          <Route path = "/cart" element = { <Cart/> } />
          <Route path = "/checkout" element = { <CheckOut/> } />
          <Route path = "*" element = { <Error />} />
        </Route>}
        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path='/admin/:id' element={<EditUser />} />
          </>
        )}
        <Route path="/signup" exact element={<Signup />} />
			  <Route path="/login" exact element={<Login />} />
			  <Route path="/" element={<Navigate replace to="/login" />} />
			  <Route path="/error" element={<Navigate replace to="/login" />} />
			  <Route path="/games" element={<Navigate replace to="/login" />} />
			  <Route path="/games/:gameId" element={<Navigate replace to="/login" />} />
			  <Route path="/stores" element={<Navigate replace to="/login" />} />
			  <Route path="/stores/:storeId" element={<Navigate replace to="/login" />} />
			  <Route path="/creators" element={<Navigate replace to="/login" />} />
			  <Route path="/cart" element={<Navigate replace to="/login" />} />
			  <Route path="/checkout" element={<Navigate replace to="/login" />} />
			  <Route path="/admin" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
