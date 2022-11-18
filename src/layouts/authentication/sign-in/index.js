
import { useState, useRef } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { AuthContext } from "../../../context/Auth";
import { useContext } from "react";

function Basic() {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false);
  const [failedToLogin, setFailedToLogin] = useState(false)
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [user, setUser] = useState({
    account: '',
    password: ''
  }) 

  const signIn = async () => {
    const admin = await fetch('http://localhost:3000/users/login ', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await admin.json()
    
    if (json.success) {
    
      authCtx.login(json.token)
      navigate('/admins')
      window.alert('You Loged in')
    } else {
      setFailedToLogin(true)
    }
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
      {failedToLogin && <MDAlert color="error" dismissible>Wrong email or password!</MDAlert>}

      {/* <MDAlert>This is an alert!</MDAlert> */}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
      
        
        <MDBox pt={4} pb={3} px={3}>
      
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" name="account" value={user?.account} onChange={(e)=> setUser({...user, account: e.target.value})} label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name='password' label="Password" fullWidth onChange={(e)=> setUser({...user, password: e.target.value})}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={signIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      
    </BasicLayout>
  );
}

export default Basic;