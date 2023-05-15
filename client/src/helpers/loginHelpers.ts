import { SessionState } from "../features/sessionControl/sessionSlice";

// export function verifyPageAccessPermission(){
//   const token = localStorage.getItem('token');
  
//   if (!token){
//     alert('You cannot access this page. Log in first.')
//     window.location.href = '/'
//   }
// }

export async function verifyPageAccessPermission(){
  (async () => {
    console.log('ASYNC FUNCTION BEING CALLED.')
    const token = localStorage.getItem('token')
    console.log('token: ', token)
    if(token){
      console.log('if token being called.')
      if(token === '' || token === null || token === undefined){
        window.location.href = '/'
      }
      (async () => {
        console.log('SECOND ASYNC FUNCTION BEING CALLED.')
        const response = await fetch('http://localhost:3000/api/verifyStatus', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token: token
          })
        })
        const data = await response.json()
        console.log('DATA: ', data)
        if (data.status !== 'ok'){
          console.log('DATA.STATUS: ', data.status)
          window.location.href = '/'
        } else if(data.status === 'ok'){
          console.log('DATA.STATUS: ', data.status)
          if(!window.location.href.includes('/user-page')){
            window.location.href = '/user-page'
          }
        }
      })();
    } else{
      alert('Please, log in first to be able to use the app.')
      window.location.href = '/'
    }
  })();
}

export async function redirectToUserPage(){
  const response = await fetch('http://localhost:3000/verify')
  const token = localStorage.getItem('token');
  if (token && token !== ''){
     window.location.href = '/user-page'
  }
}

export async function fetchUserLoginStatus(): Promise<SessionState>{
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('http://localhost:3000/api/verifyStatus', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    if (data.status === 'ok'){
      (async () => { // Now we need to fetch the user data in order to send it to global state, and it will be the initial state.
        return {userIsLogged: true, token: token, connectionError: false, isLoading: false}
      })
    }
  }
  return {userIsLogged: false, token: token, connectionError: true, isLoading: false, userData: {email: '', firstName: ''}}
};