import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './Login.css';

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt=''
        />
        <h1>Sign in to Slack Clone</h1>
        <p>Subtitle</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
