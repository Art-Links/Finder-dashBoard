import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";


import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { DateTimePicker,DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function EditBook() {

    const { token } = useContext(AuthContext)
    const handleOnChange = (e) => {
        item[e.target.name] = item[e.target.value]
    }
    const [publish, setPublish] = useState('')
    const [item, setItem] = useState({
        name: '',
        blurImage: '',
        lat: '',
        lng: '',
        city: '',
        state: '',
        street: '',
        description:'',
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editItem = async (event) => {
        event.preventDefault()
        let ItemData = new FormData(event.target)
        const added = await fetch(`http://localhost:3000/items/${id}`, {
            method: 'PUT',
            body:  ItemData,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/items')
        }
    }
    useEffect(() => {
        async function getItem() {
            const singleItemData = await fetch(`http://localhost:3000/items`)
            const json = await singleItemData.json()
            setItem(json.data)
            // console.log("json.data",json.data)
        }
        getItem();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editItem}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit A Item</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField value={item?.name} onChange={(e) => { setItem({ ...item, name: e.target.value }) }} name="name" fullWidth label="item name" /></MDBox>
                                    <MDBox mb={3}><TextField value={item?.lat} onChange={(e) => { setItem({ ...item, lat: e.target.value }) }} name="lat" fullWidth label="lat"/></MDBox>
                                    <MDBox mb={3}><TextField value={item?.lng} onChange={(e) => { setItem({ ...item, lng: e.target.value }) }} name="lng" fullWidth label="lng" /></MDBox>
                                    <MDBox mb={3}><TextField value={item?.city} onChange={(e) => { setItem({ ...item, city: e.target.value }) }} name="city" fullWidth label="city"/></MDBox>
                                    <MDBox mb={3}><TextField value={item?.description} onChange={(e) => { setItem({ ...item, description: e.target.value }) }} name="description" fullWidth label="description" /></MDBox>
                                    <MDBox mb={3}><TextField value={item?.state} onChange={(e) => { setItem({ ...item, state: e.target.value }) }} name="state" fullWidth label="state" /></MDBox>
                                    <MDBox mb={3}><TextField value={item?.street} onChange={(e) => { setItem({ ...item, street: e.target.value }) }} name="street" fullWidth label="street" /></MDBox>
                                    <MDBox mb={3}>
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                renderInput={(props) => <TextField value={book?.publish} onChange={(e) => { setBook({ ...book, publish: e.target.value }) }} name='publish' fullWidth {...props} />}
                                                label="Publish Date"
                                                // value={publishDate}
                                                value={publish}
                                                inputFormat='YYYY-MM-DD'
                                                mask='____-__-__'
                                                onChange={(newValue) => {
                                                    setPublish(dayjs(newValue).format("YYYY-MM-DD"))
                                                }}
                                            />
                                        </LocalizationProvider> */}
                                    </MDBox>
                                    <MDBox mb={3}><TextField value={item?.blurImage} onChange={(e) => { setItem({ ...item, blurImage: e.target.value }) }} name="blurImage" fullWidth label="blurImage"  /></MDBox>
                                    {/* <MDBox mb={3}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox value={item?.kindle} onChange={(e) => { setItem({ ...item, kindle: e.target.value }) }} name="kindle" />
                                            }
                                            label="Kindle"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox value={item?.paper} onChange={(e) => { setItem({ ...item, paper: e.target.value }) }} name="paper" />
                                            }
                                            label="Paper"
                                        />
                                    </MDBox> */}
                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Photo</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='cover' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit an Item
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

export default EditBook