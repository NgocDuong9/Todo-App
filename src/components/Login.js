import { useContext, useState } from "react";
import { loginApi } from "../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/Context";

function Login() {
  const navigate = useNavigate();
  const { loginConText } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Passowrd not required");
      return;
    }

    setLoadingIcon(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      loginConText(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingIcon(false);
  };

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="login-container col-xl-4 col-12">
        <div className="title">Log in</div>
        <div className="text">Email or username ( eve.holt@reqres.in )</div>
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
          {loadingIcon && <i className="fas fa-spinner fa-pulse"></i>}
          &nbsp;Login
        </button>
        <div className="back">
          <i className="fa-solid fa-chevron-left"></i>
          <span
            onClick={() => {
              handleGoBack();
            }}
          >
            Go back
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
