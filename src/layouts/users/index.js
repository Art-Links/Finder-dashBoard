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
import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

import { Link } from "react-router-dom";

function Users() {
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "userName", accessor: "userName", align: "left" },
    { Header: "email", accessor: "email", align: "center" },
    // { Header: "password", accessor: "password", align: "center" },
    { Header: "userType", accessor: "userType", align: "center" },
    { Header: "options", accessor: "options", align: "center" },
  ];
  const [rows, setRows] = useState([]);
  const [tableRows, setTableRows] = useState([])
  const { token } = useContext(AuthContext);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const deleted = await fetch(`http://localhost:3000/users/` + id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
      const result = await deleted.json()
      const remainedRows = rows.filter((user) => {
        return user.id !== id
      })
      setRows(remainedRows)
      alert(result.messages.join(' '))
    }

  }
  useEffect(() => {

    const jsxRows = rows?.map((user) => {
      // const userTypeId = user?.userTypeId
      // if (user?.userTypeId == 2) {
        return {
          id: <>{user.id}</>,
          userName: <>{user.userName}</>,
          email: <>{user.email}</>,
          userType: <>{user?.UserType?.type}</>,
          options: <>
          <MDButton variant="text" color="error" onClick={() => { deleteUser(user.id) }}>
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <Link to={`/users/${user.id}`}>
              <MDButton variant="text" color="dark">
                <Icon>edit</Icon>&nbsp;edit
              </MDButton>
            </Link>
          </>
        };
      
    },[]);
    setTableRows(jsxRows);
  }, [rows])
  useEffect(() => {
    async function getUsers() {
      const data = await fetch(`http://localhost:3000/users/all`);
      const users = await data.json()
      setRows(users.data)
    }
    getUsers();
  }, []);
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
                      Users List
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <Link to='/users/add'>
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

export default Users;