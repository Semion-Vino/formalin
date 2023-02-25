import {  Route ,Navigate, Outlet} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PrivateRoute () {
  const [cookies, setCookie] = useCookies(['user']);

    const isLoggedIn = cookies.user;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  }

  