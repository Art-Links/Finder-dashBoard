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



function Admin() {
    const { token } = useContext(AuthContext)
    const columns = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "name", accessor: "name", align: "left" },
        { Header: "email", accessor: "email", align: "center" },
        { Header: "userTypeId", accessor: "userTypeId", align: "center" },
        { Header: "options", accessor: "options", align: "center" },

    ];

    const [rows, setRows] = useState([]);
    const [tableRows, setTableRows] = useState([])
    const deleteAdmin = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            const deleted = await fetch(`http://localhost:3000/users/` + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            })
            const result = await deleted.json()
            const remainedRows = rows.filter((admin) => {
                return admin.id != id
            })
            setRows(remainedRows)
            alert(result.messages.join(' '))
        }

    }
    useEffect(() => {
        const jsxRows = rows?.map((admin) => {
            return {
                id: <>{admin?.id}</>,
                name: <>{admin?.name}</>,
                email: <>{admin?.email}</>,
                userTypeId: <>{admin?.userTypeId}</>,
                options: <>
                    <MDButton variant="text" color="error" onClick={() => { deleteAdmin(admin.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/admins/${admin.id}`}>
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
        async function getAdmins() {
            const data = await fetch(`http://localhost:3000/admin`,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                    }),
                    redirect: 'follow'
                }
            );
            const admins = await data.json()
            if (admins?.success) {
                setRows(admins.data)
            }
        }
        getAdmins();
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
                                        <Link to='/admins/add'>
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

export default Admin;