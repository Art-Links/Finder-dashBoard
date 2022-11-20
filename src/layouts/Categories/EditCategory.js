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
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import Icon from "@mui/material/Icon";


import { AuthContext } from "context/Auth";

function EditCategory() {
    
    const { token } = useContext(AuthContext);
    // console.log("token",token)
    
    const [category, setCategory] = useState({
        name: '',
        icon: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editCategory = async (event) => {
        event.preventDefault()
        let CategoryData = new FormData(event.target)
        // console.log("CategoryData", CategoryData)
        const edit = await fetch(`http://localhost:3000/category/${id}`, {
            method: 'PUT',
            body: CategoryData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await edit.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/Categories')
        }
    }

    useEffect(() => {
        async function getCategory() {
            const CategoryData = await fetch(`http://localhost:3000/category`)
            const json = await CategoryData.json()
            setCategory(json.data)
        }
        getCategory();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editCategory}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Category</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={category?.name} onChange={(e) => { setCategory({ ...category, name: e.target.value }) }} name="name" fullWidth label="category Name" />
                                    </MDBox>
                                    {/* <MDBox mb={3}>
                                        <TextField value={category?.icon} onChange={(e) => { setCategory({ ...category, icon: e.target.value }) }} name="icon" fullWidth label="category icon" />
                                    </MDBox> */}
                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Photo</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='icon' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>

                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit categories
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

export default EditCategory