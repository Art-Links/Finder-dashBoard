import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import * as React from 'react';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function AddBook() {

    const { token } = useContext(AuthContext)
    const [publish, setPublish] = useState('')
    const navigate = useNavigate()
    const AddBook = async (event) => {
        let BookData = new FormData(event.target)
        event.preventDefault()
        console.log("BookData", BookData)

        // console.log("event.target", event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: BookData
        })
        const json = await added.json()
        // console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/books')
        }
    }
    const [categories, setCategories] = useState()
    const [publishers, setPublishers] = useState()
    useEffect(() => {
        async function getCategories() {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/categories/all`);
            const categoriesData = await data.json()
            setCategories(categoriesData.data)
        }
        // console.log("categoriesData",categories)
        getCategories();

        async function getPublishers() {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/publishers/all`);
            const publishersData = await data.json()
            // console.log("publishersData",publishersData)
            setPublishers(publishersData.data)
        }
        getPublishers();
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={AddBook}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Book</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="name" fullWidth label="Book name" /></MDBox>
                                    <MDBox mb={3}><TextField name="pagesCount" fullWidth label="Pages Number" /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="categoryId" fullWidth label="CategoryId"/></MDBox> */}
                                    {/* <MDBox mb={3}>
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                        {(popupState) => (
                                            <React.Fragment>
                                            <Button variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Category
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                {
                                                    categories?.map((category, i) => {
                                                        return(
                                                            <MenuItem name='categoryId' key={i} value={category?.id} onClick={popupState.close}>{category?.name}</MenuItem>
                                                        )
                                                        })
                                                }
                                            </Menu>
                                            </React.Fragment>
                                        )}
                                        </PopupState>
                                    </MDBox> */}
                                    <MDBox mb={3}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Category
                                                </InputLabel>
                                                <NativeSelect
                                                defaultValue={categories[0]?.id}
                                                inputProps={{
                                                    name: 'categoryId',
                                                    id: 'uncontrolled-native',
                                                }}
                                                >
                                                    {
                                                    categories?.map((category, i) => {
                                                        return(
                                                            <option key={i} value={category?.id}>{category?.name}</option>
                                                        )
                                                        })
                                                    }
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                    </MDBox>
                                    <MDBox mb={3}><TextField name="des" fullWidth label="Description" /></MDBox>
                                    <MDBox mb={3}><TextField name="author" fullWidth label="Author"/></MDBox>
                                    <MDBox mb={3}><TextField name="ISBN" fullWidth label="ISBN" /></MDBox>
                                    <MDBox mb={3}><TextField name="lang" fullWidth label="Language" /></MDBox>
                                    <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                renderInput={(props) => <TextField name='publish' fullWidth {...props} />}
                                                label="Publish Date"
                                                // value={publishDate}
                                                value={publish}
                                                // onChange={(e) => setBook({ ...Book, publish: e.target.value })}
                                                inputFormat='YYYY-MM-DD'
                                                mask='____-__-__'
                                                onChange={(newValue) => {
                                                    setPublish(dayjs(newValue).format("YYYY-MM-DD"))
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </MDBox>
                                    {/* <MDBox mb={3}><TextField name="publisherId" fullWidth label="publisherId"  /></MDBox> */}
                                    {/* <MDBox mb={3}>
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                        {(popupState) => (
                                            <React.Fragment>
                                            <Button variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Publisher
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                {
                                                    publishers?.map((publisher, i) => {
                                                        // console.log("publisher?.id",publisher?.id)
                                                        return(
                                                            <MenuItem name='publisherId' key={i} value={publisher?.id} onClick={popupState.close}>{publisher?.name}</MenuItem>
                                                        )
                                                        })
                                                }
                                            </Menu>
                                            </React.Fragment>
                                        )}
                                        </PopupState>
                                    </MDBox> */}
                                    <MDBox mb={3}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Publisher
                                                </InputLabel>
                                                <NativeSelect
                                                defaultValue={publishers[0]?.id}
                                                inputProps={{
                                                    name: 'publisherId',
                                                    id: 'uncontrolled-native',
                                                }}
                                                >
                                                    {
                                                    publishers?.map((publisher, i) => {
                                                        // console.log("publisher?.id",publisher?.id)
                                                        return(
                                                            <option key={i} value={publisher?.id}>{publisher?.name}</option>
                                                            
                                                        )
                                                        })
                                                    }
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox value='1' name="kindle" />
                                            }
                                            label="Kindle"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox value='1' name="paper" />
                                            }
                                            label="Paper"
                                        />
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Cover</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='cover' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Book
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

export default AddBook