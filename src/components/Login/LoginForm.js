import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/user';
import { useState, useEffect } from 'react';
import { storageSave } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { STORAGE_KEY_USER } from '../../const/storageKeys';
import './LoginForm.css';

const usernameConfig = {
  required: true,
  minLength: 2,
};

const LoginForm = () => {
  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  //Local state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  //side effects
  useEffect(() => {
    if (user !== null) {
      navigate('profile');
    }
    //redirect to profile
    //console.log("user has changed!", user)
  }, [user, navigate]);

  //event handlers
  const onSubmit = async ({ username }) => {
    setLoading(true);
    const [error, userResponse] = await loginUser(username);
    //console.log(data);
    //console.log('Error: ', error);
    //console.log('User: ', user);
    if (error !== null) {
      setApiError(error);
    }
    if (userResponse !== null) {
      storageSave(STORAGE_KEY_USER, userResponse);
      setUser(userResponse);
    }

    setLoading(false);
  };

  //render functions
  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }
    if (errors.username.type === 'required') {
      return <span>Username is required</span>;
    }
    if (errors.username.type === 'minLength') {
      return <span>Username is too short (min. 2 characters)</span>;
    }
  })();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} class="loginForm">
        <div class="login-container">
          <fieldset>
            <svg
              width="40"
              height="40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <input
              type="text"
              placeholder="What your name?"
              {...register('username', usernameConfig)}
              class="username-input"
            />
            <button type="submit" disabled={loading} class="login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {/*(errors.username && errors.username.type === 'required') && <span>Username is required</span>*/}
            {/*(errors.username && errors.username.type === 'minLength') && <span>Username is too short (min. 2 characters)</span>*/}
            {errorMessage}
          </fieldset>
        </div>

        {loading && <p>logging in...</p>}
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  );
};

export default LoginForm;
