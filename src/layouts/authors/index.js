import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Auth";

import { Link } from "react-router-dom";
// import Authors from "layouts/auther";



function Author() {
    const{token}= useContext(AuthContext)
    const columns = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "username", accessor: "username", align: "left" },
        { Header: "email", accessor: "email", align: "center" },
        { Header: "options", accessor: "options", align: "center" },

    ];

    const [rows, setRows] = useState([]);
    const [tableRows, setTableRows] = useState([])
    const deleteAuthor = async (id) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            const deleted = await fetch(`${process.env.REACT_APP_API_URL}/authors/` + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            })
            const result = await deleted.json()
            const remainedRows = rows.filter((author) => {
                return author.id != id
            })
            setRows(remainedRows)
            alert(result.messages.join(' '))
        }

    }
    useEffect(() => {
        const jsxRows = rows?.map((author) => {
            return {
                id: <>{author?.id}</>,
                username: <>{author?.username}</>,
                email: <>{author?.email}</>,

                options: <>
                    <MDButton variant="text" color="error" onClick={() => { deleteAuthor(author.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/authors/${author.id}`}>
                        <MDButton variant="text" color="dark">
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </Link>
                </>
            };
        });
        setTableRows(jsxRows);
    }, [rows])
    useEffect(() => {
        const headers = {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token}`, 
          }),
        redirect: 'follow'
        }
        console.log('useeffect 2')
        async function getAuthors() {
          console.log("get Authors")
            const data = await fetch(`${process.env.REACT_APP_API_URL}/authors/allAuthors`, headers);
            console.log(data, 'data')
            const admins = await data.json()
            console.log(admins, 'authors')
            if(admins?.success){
                setRows(admins.data)
            }
        }
        getAuthors();
    }, []);
    console.log(rows)
    // const token = sessionStorage.getItem('token'); //Add this line

    // return fetch(process.env.REACT_APP_API_URL}+'/admins/all', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}` //Add this line
    //     },
    //     body: JSON.stringify(token),
    // })
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <MDTypography variant="h6" color="white">
                                            Admins List
                                        </MDTypography>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/authors/add'>
                                            <MDButton variant="text" color="white">
                                                <Icon>add_circle</Icon>&nbsp;Add
                                            </MDButton>
                                        </Link>
                                    </Grid>
                                </Grid>

                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{
                                        columns,
                                        rows: tableRows
                                    }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default Author;