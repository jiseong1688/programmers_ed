import { useNavigate } from "react-router-dom";
import { login, resetPassword, resetRequest, signup } from "../api/auth.api";
import { LoginProps } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { SignupProps } from "../pages/Signup";
import { useState } from "react";

export const useAuth = () =>{
  // 상태
  const {storeLogin} = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [resetRequested, setResetRequested] = useState(false)
  

  // 메소드
  const userLogin = (data: LoginProps) =>{
    login(data).then((res)=>{
        // 성공
        storeLogin(res.token);
        showAlert('로그인이 완료되었습니다.')
        navigate("/")
    }, (error)=>{
        showAlert('로그인이 실패하였습니다.')
    })
  }

  const userSignup = (data: SignupProps) =>{
    signup(data).then((res)=>{
        // 성공
        showAlert('회원가입이 완료되었습니다.')
        navigate("/login")
    })
  }

  const userResetPassword = (data: SignupProps)=>{
    resetPassword(data).then(()=>{
        showAlert("비밀번호 초기화되었습니다.");
        navigate("/login");
    })
  }

  const userResetRequest = (data:SignupProps)=>{
    resetRequest(data).then(()=>{
        setResetRequested(true);
    })
  }

  return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested }
}
