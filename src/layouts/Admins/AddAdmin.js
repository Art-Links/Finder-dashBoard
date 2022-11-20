import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";


import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/Auth";

function AddAdmin() {
    const { token } = useContext(AuthContext);
    const [admin, setAdmin]= useState({
        userName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
    })
    const navigate = useNavigate()
    const addAdmin = async (event) => {
        event.preventDefault()
        console.log(admin)        
        const added = await fetch(`http://localhost:3000/admin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body:  JSON.stringify(admin)
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/admins')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={addAdmin}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Admin</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="userName" fullWidth label="userName" value={admin.userName} onChange={(e) => setAdmin({...admin, userName: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="email" fullWidth label="Email" value={admin.email} onChange={(e) => setAdmin({...admin, email: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="password" fullWidth label="Password" value={admin.password} onChange={(e) => setAdmin({...admin, password: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="password" fullWidth label="PasswordConfirmation" value={admin.passwordConfirmation} onChange={(e) => setAdmin({...admin, passwordConfirmation: e.target.value})} /></MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Admin
                                            </MDTypography>
                                        </Button>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default AddAdmin