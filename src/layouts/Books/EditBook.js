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
        book[e.target.name] = book[e.target.value]
    }
    const [publish, setPublish] = useState('')
    const [book, setBook] = useState({
        name: '',
        pagesCount: '',
        categoryId: '',
        des: '',
        publish: '',
        publisherId:'',
        lang: '',
        ISBN: '',
        author: '',
        kinle: '',
        paper: '',
        cover: '',

    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editBook = async (event) => {
        event.preventDefault()
        let bookData = new FormData(event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/books/edit/${id}`, {
            method: 'PUT',
            body:  bookData,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/books')
        }
    }
    useEffect(() => {
        async function getBook() {
            const singleBookData = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`)
            const json = await singleBookData.json()
            setBook(json.data)
            console.log("json.data",json.data)
        }
        getBook();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editBook}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit A Book</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField value={book?.name} onChange={(e) => { setBook({ ...book, name: e.target.value }) }} name="name" fullWidth label="Book name" /></MDBox>
                                    <MDBox mb={3}><TextField value={book?.pagesCount} onChange={(e) => { setBook({ ...book, pagesCount: e.target.value }) }} name="pagesCount" fullWidth label="Pages Number" /></MDBox>
                                    <MDBox mb={3}><TextField value={book?.categoryId} onChange={(e) => { setBook({ ...book, categoryId: e.target.value }) }} name="categoryId" fullWidth label="categoryId"/></MDBox>
                                    <MDBox mb={3}><TextField value={book?.des} onChange={(e) => { setBook({ ...book, des: e.target.value }) }} name="des" fullWidth label="Description" /></MDBox>
                                    <MDBox mb={3}><TextField value={book?.author} onChange={(e) => { setBook({ ...book, author: e.target.value }) }} name="author" fullWidth label="Author"/></MDBox>
                                    <MDBox mb={3}><TextField value={book?.ISBN} onChange={(e) => { setBook({ ...book, ISBN: e.target.value }) }} name="ISBN" fullWidth label="ISBN" /></MDBox>
                                    <MDBox mb={3}><TextField value={book?.lang} onChange={(e) => { setBook({ ...book, lang: e.target.value }) }} name="lang" fullWidth label="Language" /></MDBox>
                                    <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                        </LocalizationProvider>
                                    </MDBox>
                                    <MDBox mb={3}><TextField value={book?.publisherId} onChange={(e) => { setBook({ ...book, publisherId: e.target.value }) }} name="publisherId" fullWidth label="publisherId"  /></MDBox>
                                    <MDBox mb={3}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox value={book?.kindle} onChange={(e) => { setBook({ ...book, kindle: e.target.value }) }} name="kindle" />
                                            }
                                            label="Kindle"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox value={book?.paper} onChange={(e) => { setBook({ ...book, paper: e.target.value }) }} name="paper" />
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
                                                Edit A Book
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