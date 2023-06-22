import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Passowrd not required");
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleEnterKey = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      toast.success("Login success!");
      navigate("/");
    }
  }, [account]);
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
            onKeyDown={(e) => handleEnterKey(e)}
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
          {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
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
