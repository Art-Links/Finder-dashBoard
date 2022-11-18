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
import { useRef, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

function AddCategory() {
    const{token}= useContext(AuthContext)
    const handleOnChange = (e) => {
        category[e.target.name] = category[e.target.value]
    }
    const [category, setCategory]= useState({
        name:'',
        des:'',
    })
    const navigate = useNavigate()
    const addCategory = async (event) => {
        event.preventDefault()
        console.log(category)        
        const added = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
            body:  JSON.stringify(category)
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/categories')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={addCategory}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Category</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="name" fullWidth label="name" value={category.name} onChange={(e) => setCategory({...category, name: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="des" fullWidth label="des" value={category.des} onChange={(e) => setCategory({...category, des: e.target.value})} /></MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Category
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

export default AddCategory