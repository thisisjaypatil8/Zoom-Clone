import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Snackbar from "@mui/material/Snackbar";

import { GoogleIcon, FacebookIcon } from "../assets/CustomIcons";
import "../assets/styles/authentication.css";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../context/AuthContext";

export default function Authentication() {



  // Input states
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [formState, setFormState] = React.useState("Sign up");
  const [message, setMessage] = React.useState();

  // Error states
  const [error, setError] = React.useState(false);
  const [fullnameError, setFullnameError] = React.useState(false);
  const [fullnameErrorMessage, setFullnameErrorMessage] = React.useState("");

  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  // Validate form inputs
  const validateInputs = () => {
    let isValid = true;

    if (!fullname && formState == "Sign up") {
      setFullnameError(true);
      setFullnameErrorMessage("Please enter a valid name.");
      isValid = false;
    } else {
      setFullnameError(false);
      setFullnameErrorMessage("");
    }

    // Email validation
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 6 characters."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();



    if (!validateInputs()) {
      return;
    }
    await handleAuth();
    // Valid form data
    console.log({
      fullname,
      username,
      password,
    });
  };

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      setError("");
      if (formState === "Sign up") {
        let result = await handleRegister(fullname, username, password);
        setMessage(result);
        setOpen(true);
        setFormState("Sign in");
        setUsername("");
        setPassword("");
      }
      if (formState === "Sign in") {
        let result = await handleLogin(username, password);
        setMessage(result);
        setOpen(true);
      }
    } catch (e) {
      let message = (e?.response?.data?.message || "Something went wrong");
      setError(message);
    }

  }

  return (
    <div className="auth-container">

      {/* Left visual section */}
      <div className="auth-visual" />


      {/* Right authentication section */}
      <div className="auth-form-section">

        {/* Heading */}
        <Avatar sx={{ bgcolor: "secondary.main", height: 50, width: 50, alignSelf: "center", mb: 2 }}>
          <LockOutlinedIcon sx={{ height: 25, width: 25 }} />
        </Avatar>

        <div className="auth-toggle">
          <Button variant={formState == "Sign up" ? "contained" : "outlined"}
            onClick={() => setFormState("Sign up")}
          >
            Sign up
          </Button>
          <Button variant={formState == "Sign in" ? "contained" : "outlined"}
            onClick={() => setFormState("Sign in")}
          >
            Sign in
          </Button>
        </div>


        {/* Login form */}
        <Box
          component="form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full name input */}
          {formState == "Sign up" && (
            <TextField
              className="auth-input"
              label="Full Name"
              error={fullnameError}
              helperText={fullnameErrorMessage}
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter Your full name here"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          )}
          {/*Username input */}
          <TextField
            className="auth-input"
            label="Username"
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            name="username"
            type="text"
            placeholder="Enter Your Username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
            fullWidth
            variant="outlined"
          />

          {/* Password input */}
          <TextField
            className="auth-input"
            label="Password"
            error={passwordError}
            helperText={passwordErrorMessage}
            id="password"
            name="password"
            type="password"
            placeholder="Enter Your Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />

          <Typography sx={{ color: "red" }}>{error}</Typography>

          {/* Sign in button */}
          <Button
            className="loginBtn"
            type="submit"
            fullWidth
            variant="contained"
          >
            {formState == "Sign up" ? "Sign up" : "Sign in"}
          </Button>


          {/* Signup link */}
          <Typography className="auth-signup-text">
            Don't have an account?{" "}
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              className="auth-signup-link"
            >
              Sign up
            </Link>
          </Typography>

        </Box>


        {/* Divider */}
        <Divider className="auth-divider">
          or
        </Divider>


        {/* Social login buttons */}
        <Box className="auth-social-buttons">

          {/* Google login */}
          <Button
            className="otherBtn"
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>


          {/* Facebook login */}
          <Button
            className="otherBtn"
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>

        </Box>

      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}

      />
    </div>
  );
}
