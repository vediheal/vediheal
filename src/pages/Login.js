import { useEffect } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import ForgetPasswordEmailModal from "./modals/ForgetPasswordEmailModal";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";

function Login(props) {
  // useEffect(()=>{
  //   console.log(props);
  //   props.setUserJWT("hello world");
  // },[]);


  const [loginError, setLoginError] = useState(null);

  const handelLogin = async () => {
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const privacyCheck = document.getElementById("privacyCheck").checked;

    if(data.email==null || data.email.length == 0){
      setLoginError("Please enter email!");
      return;
    }
    if(data.password==null || data.password.length == 0){
      setLoginError("Please enter password!");
      return;
    }
    if(!privacyCheck){
      setLoginError("Please agree with the terms and condition and privacy policy!");
      return;
    }

    let url;

    // url = "https://vediheal-backend.vercel.app/login/user";
    url = "http://localhost:5000/login/user";

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, options);
    const body = await res.json();
    // console.log(body);
    // return;
    if (body.message && body.message == "Login successful!") {
      setLoginError(null);

      props.setUserJWT(body.jwt);
      history.push("/services");
    } else {
      setLoginError(body.error);
    }
  };

  const history = useHistory();
  function handleClick() {
    history.push("/signup");
  }

  function privacypolicy() {
    history.push("/privacypolicy");
  }

  function instructorLogin() {
    history.push("/instructorlogin");
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100  btn-col mt-6">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column form text-dark">
              <h2
                className="fw-500 mb-2 text-center"
                style={{ color: "black" }}
              >
                Log in
              </h2>
              <p className="fw-bold text-center mb-3">
                Don't have an account?
                <span className="link text-danger">
                  <a onClick={handleClick}> Sign up</a>
                </span>
              </p>

              <MDBInput
                className="transparent-input"
                wrapperClass="mb-4 w-100"
                placeholder="Email address*"
                id="email"
                type="email"
                size="lg"
              />
              <MDBInput
                className="transparent-input"
                wrapperClass="mb-4 w-100"
                placeholder="Password*"
                id="password"
                type="password"
                size="lg"
              />

              <span className="link">{loginError}</span>

              <p className="fw-bold text-left forgot-password">
                <ForgetPasswordEmailModal />
              </p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="privacyCheck"
                />
                <label
                  class="form-check-label"
                  for="flexCheckDisabled"
                  style={{ fontSize: "10px" }}
                >
                  I agree with VediHeal's{" "}
                  <span className="link">
                    <a
                      onClick={() => {
                        privacypolicy();
                      }}
                    >
                      Terms and Conditions
                    </a>
                  </span>{" "}
                  and{" "}
                  <span className="link">
                    <a
                      onClick={() => {
                        privacypolicy();
                      }}
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
              {/* <div class="form-check">
                <span className="link"><a onClick={() => {instructorLogin()}}><label class="form-check-label">Are You an Instructor?</label></a></span>
              </div> */}
              <br />
              <MDBBtn className="login-btn" onClick={handelLogin}>
                <span className="loginbutton">Login</span>
              </MDBBtn>
              <br />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
