import React, { useState } from "react";
import { attemptLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import { GithubIcon } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${window.CLIENT_ID}`}
        className="min flex w-96 items-center justify-center rounded border border-2 border-white p-2 hover:border-teal-200 hover:text-teal-200"
      >
        <span className="mr-2 text-black opacity-100 hover:text-teal-200">
          <GithubIcon size={24} className="text-white opacity-100" />
        </span>
        <span className="ml-3 text-white opacity-100 hover:text-teal-200">
          Continue with Github
        </span>
      </a>
    </div>
  );
};

export default Login;
