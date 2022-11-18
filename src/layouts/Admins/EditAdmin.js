import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
// import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from "@mui/material/Button";
// import Icon from "@mui/material/Icon";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "context/Auth";
// import { token } from "stylis";
// import Avatar from '@mui/material/Avatar';

// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';


function EditAdmin() {
    const { token } = useContext(AuthContext);
    const [admin, setAdmin] = useState({
        userName: '',
        email: '',
        password: '',
        userTypeId: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editAdmin = async (event) => {
        event.preventDefault()
        // let adminData = new FormData(event.target)
        const added = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(admin),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/admins')
        }
    }
    // const deletePhoto = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this photo?')) {
    //       const deleted = await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
    //         method: 'DELETE'
    //       })
    //       const result = await deleted.json()
    //       const remainedPhotos = trip.Photos.filter((photo) => {
    //         return photo.id !== id
    //       })
    //       setTrip({...trip, Photos: remainedPhotos})
    //       alert(result.messages.join(' '))
    //     }
    //   }
    useEffect(() => {
        async function getAdmin() {
            const AdminData = await fetch(`http://localhost:3000/admin`)
            const json = await AdminData.json()
            setAdmin(json.data)
        }
        getAdmin();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editAdmin}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Admin</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={admin?.userName} onChange={(e) => { setAdmin({ ...admin, userName: e.target.value }) }} name="userName" fullWidth label="Admin Name" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={admin?.email} onChange={(e) => { setAdmin({ ...admin, email: e.target.value }) }} name="email" fullWidth label="Admin Email" /></MDBox>

                                    <MDBox mb={3}>
                                        <TextField value={admin?.password} onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }} name="password" fullWidth label="Admin Password" /></MDBox>

                                    <MDBox mb={3}>
                                        <TextField value={admin?.userTypeId} onChange={(e) => { setAdmin({ ...admin, userTypeId: e.target.value }) }} name="userTypeId" fullWidth label="Admin userTypeId" /></MDBox>

                                    {/* <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={trip.date}
                                                renderInput={(props) => <TextField name="date" fullWidth {...props} />}
                                                label="Trip Date"
                                                inputFormat="YYYY-MM-DD HH:mm:ss"
                                                mask="____-__-__ __:__:__"
                                                onChange={(newValue) => {
                                                    setTrip({ ...trip, date: dayjs(newValue).format("YYYY-MM-DD HH:mm:ss") })
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </MDBox> */}
                                    {/* <MDBox mb={3}>
                                        <Grid container spacing={2}>
                                            {
                                                trip.Photos.map((photo, i) => {
                                                    return (
                                                        <Grid item key={i}>
                                                            <Avatar
                                                                alt=""
                                                                variant="square"
                                                                src={photo.file}
                                                                sx={{ width: 150, height: 150 }}
                                                            />
                                                            <IconButton aria-label="delete" onClick={() => {deletePhoto(photo.id)}}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Photos</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input hidden name="photo" accept="image/*" multiple type="file" />
                                        </Button>
                                    </MDBox> */}
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit Admin
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

export default EditAdmin