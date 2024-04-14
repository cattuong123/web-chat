import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/chatting.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Không được để trống Email hoặc Password.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Không được để trống Email hoặc Password.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <PageContainer>
        <FormContainerLeft>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <h1>CHAT APP</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Log In</button>
            <span>
              Don't have an account ? <Link to="/register">Create One.</Link>
            </span>
          </form>
        </FormContainerLeft>
        <FormContainerRight>
          <img src={Logo} alt="chatting" />
        </FormContainerRight>
      </PageContainer>
      <ToastContainer />
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const FormContainerLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 3rem 5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;

      h1 {
        color: black;
        text-transform: uppercase;
      }
    }

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;

      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: black;
      text-transform: uppercase;

      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

const FormContainerRight = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
background-color: #ffe4e1;
`;
