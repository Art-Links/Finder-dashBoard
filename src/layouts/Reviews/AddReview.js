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

function AddReview() {
    const handleOnChange = (e) => {
        review[e.target.name] = review[e.target.value]
    }
    const { token } = useContext(AuthContext);
    const [review, setReview]= useState({
        userId : "",
        bookId : "",
        content: ""     
    })
    const navigate = useNavigate()
    const AddReview = async (event) => {
        event.preventDefault()     
        const added = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/reviews')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={AddReview}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Review</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="userId" fullWidth label="userId" value={review.userId} onChange={(e) => setReview({...review, userId: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="bookId" fullWidth label="bookId" value={review.bookId} onChange={(e) => setReview({...review, bookId: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="content" fullWidth label="content" value={review.content} onChange={(e) => setReview({...review, content: e.target.value})} /></MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Review
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

export default AddReview