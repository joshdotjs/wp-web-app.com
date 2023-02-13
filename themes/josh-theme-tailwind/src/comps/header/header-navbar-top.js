import { fireEvent } from '../../util/custom-event';
import { fetchGET } from '../../util/fetch';
// import logo from '../../img/logo.svg';

// ==============================================

export default function NavbarTop({ site_urls, isActive, logged_in, user }) {

  console.log('logged_in: ', logged_in );
  console.log('user: ', user);

  return (
    <div // navbar-top
      id="navbar-top"
      class="flex justify-between bg-green-300  py-5  px-[40px]  sm:px-[50px]  md:px-[60px]  lg:px-[80px]  xl:px-[100px]"       
      style={{ background: '#111926', color: 'white' }}
    >

      <a // logo
        // href={site_urls.home}
        href={`${PHP.site_url}/`}
      >
        {/* <img class="mx-auto h-8 w-auto" src={logo} alt="Logo" /> */}
      </a>


      <ul // navlinks
        id="navbar-navlinks"
        class="flex items-center"
      >

        <li class={`mr-4 ${isActive('about')}  hidden md:inline`}>
          <a 
            // href={site_urls.about}
            href={`${PHP.site_url}/about`}
          >About</a>
        </li>

        <span class="hidden md:inline">│</span>

        <li class={`ml-4 mr-4 ${isActive('contact')}  hidden md:inline`}>
          <a 
            // href={site_urls.contact}
            href={`${PHP.site_url}/contact`}
          >Contact</a>
        </li>

        <span class="hidden md:inline">│</span>


        { logged_in && 

          <>
            <li class={`ml-4 inline-block`}>
              {/* <a href={site_urls.orders}>Account</a> */}
              <button onClick={async () => {
                // console.log('signing out...');
                // const data = await fetchGET('http://jadefse.local/wp-json/josh/v1/signout');
                const data = await fetchGET(`${PHP.rest_url}/signout`);
                // console.log('resonse: ', data);
                window.location.pathname = '/';
              }} >Logout</button>
            </li>

            <span class="ml-4">│</span>
                      
            <li class={`ml-4 inline-block`}>
              {/* <a href={site_urls.orders}>Account</a> */}

              {/* { user.admin === false && <a href={site_urls.orders}>{user?.username}</a> } */}
              {/* { user.admin === true  && <a href='/admin-dashboard'>{user?.username}</a> } */}
              { user.admin === false && <a href={`${PHP.site_url}/orders`}>{user?.username}</a> }
              { user.admin === true  && <a href={`${PHP.site_url}/admin-dashboard`}>{user?.username}</a> }
              
            </li>
          </>      
        }
        { !logged_in && 
          <>
            <li class={`ml-4 mr-4 inline-block}  hidden md:inline`}>
              {/* <a href={site_urls.auth_login}>Sign In</a> */}
              <a href={`${PHP.site_url}/auth-login`}>Sign In</a>
            </li>

            {/* <li class={`ml-4 mr-4 inline-block  inline md:hidden`}>
              <a href={site_urls.auth_login}>Sign In</a>
            </li> */}
            
            <span class="hidden md:inline">│</span>

            <li class={`ml-4 inline-block`}>
              {/* <a href={site_urls.auth_register}>Register</a> */}
              <a href={`${PHP.site_url}/auth-register`}>Register</a>
            </li>
          </>
        }
      </ul>
      {/* navlinks */}
  
    </div>
  );
}
