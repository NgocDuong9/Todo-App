import { useState } from "react";
import { loginApi } from "../services/UserServices";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Passowrd not required");
      return;
    }

    let res = await loginApi("eve.holt@reqres.in", password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
    }
    console.log(res);
  };
  return (
    <>
      <div className="login-container col-xl-4 col-12">
        <div className="title">Log in</div>
        <div className="text">Email or username</div>
        <input
          type="text"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="ip2">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPasswod(e.target.value)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div className="back">
          <i className="fa-solid fa-chevron-left"></i>Go back
        </div>
      </div>
    </>
  );
}

export default Login;
