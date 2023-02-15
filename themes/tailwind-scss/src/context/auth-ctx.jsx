import React, { useState, createContext, useEffect } from 'react';

import { getLS, setLS, removeLS } from '@/util/local-storage';
import { redirect } from '@/util/routes';

// ==============================================

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  token: '',
  setToken: () => {},
  logged_in: false,
  logOut: () => {},
  logIn: () => {},
});

// ==============================================

function AuthContextProvider ({ children, restrict }) {

  // --------------------------------------------

  // const router = useRouter();

  // --------------------------------------------

  const [user, setUser]          = useState({});
  const [token, setToken]        = useState('');
  const [logged_in, setLoggedIn] = useState(false);
  
  // --------------------------------------------

  // -Load data from LS on page load
  useEffect(() => {
    // -We want to get all of these here to invalidate their data in LS if TTL has expired.
    const logged_in = getLS('logged_in');
    const user = getLS('user');
    const token = getLS('token');



    if (logged_in) {
      setLoggedIn(logged_in);
      setToken(token);
      setUser(user);
    }

    if (restrict) {
      console.log('auth-ctx -- useEffect(, []) -- restrict: ', restrict);
      console.log('user?.is_admin: ', user?.is_admin);

      if (restrict === 'admin' && user?.is_admin !== true) { 
        // router.replace('/auth/login');
        // debugger;
        redirect('/auth/login');
      }
      if (restrict === 'user' && !user) { 
        // router.replace('/auth/login'); 
        // debugger;
        redirect('/auth/login');
      }
    }

  }, []);

  // --------------------------------------------

  const logIn = ({token, user}) => {

    console.log('logging user in (auth-ctx)');
    console.log('user: ', user);
    console.log('token: ', token);

    setToken(token);
    setLS('token', token);

    setUser(user);
    setLS('user', {...user, is_admin: !!user?.is_admin}); // mysql 1 => true

    setLoggedIn(true);
    setLS('logged_in', true);

    if (user?.is_admin) {
      // router.push('/admin');
      redirect('/admin');
    }
    else {
      // router.push('/user');
      redirect('/user');
    }
  };

  // --------------------------------------------
  
  const logOut = () => {
    setToken(null);
    removeLS('token');

    setUser(user);
    removeLS('user');

    setLoggedIn(false);
    removeLS('logged_in');

    // router.replace('/');
    redirect('/');
  };
  
  // --------------------------------------------
  
  const context = {
    user,
    token,
    logged_in,
    logIn,
    logOut,
  };
  
  // --------------------------------------------
  
  return (
    <AuthContext.Provider value={context}>{ children }</AuthContext.Provider>
  );
  
  // --------------------------------------------

}

// ==============================================

export default AuthContext;
export { AuthContextProvider };