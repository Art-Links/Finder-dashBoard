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
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "context/Auth";
import { Avatar } from "@mui/material";

function Item() {
    const columns = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "name", accessor: "name", align: "left" },
        { Header: "img", accessor: "img", align: "center" },
        { Header: "latX", accessor: "latX", align: "center" },
        { Header: "longY", accessor: "longY", align: "center" },
        { Header: "Category", accessor: "Category", align: "center" },
        { Header: "des", accessor: "des", align: "center" },
        { Header: "userId", accessor: "userId", align: "center" },
        { Header: "userName", accessor: "userName", align: "center" },
        { Header: "isReturned", accessor: "isReturned", align: "center" },
        { Header: "allowedAttempts", accessor: "allowedAttempts", align: "center" },
        { Header: "options", accessor: "options", align: "center" },
    ];
    const [rows, setRows] = useState([]);
    const [tableRows, setTableRows] = useState([])
    const { token } = useContext(AuthContext)
    // console.log("Token is ",token)
    const deleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const deleted = await fetch(`http://localhost:3000/items/myItems`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await deleted.json()
            const remainedRows = rows.filter((item) => {
                return item.id != id
            })
            setRows(remainedRows)
            alert(result.messages.join(' '))
        }

    }
    useEffect(() => {
        const jsxRows = rows?.map((item) => {
            // const categoryName = getCategoryName(book.categoryId)
            // console.log("categoryName", categoryName)
            // console.log("book categories",book.Categories)
            return {
                id: <>{item.id}</>,
                name: <>{item.name}</>,
                img: <>{item.img}</>,
                Category: <>{item.Category.name}</>,
                latX: <>{item.latX}</>,
                longY: <>{item?.longY}</>,
                des: <>{item?.des}</>,
                userId: <>{item?.User.id}</>,
                userName: <>{item?.User.userName}</>,
                isReturned: <>{item?.isReturned}</>,
                allowedAttempts: <>{item?.allowedAttempts}</>,

                // des: <>{book.des}</>,
                img: <>
                    <Avatar
                        alt=""
                        variant="square"
                        src={item.img}
                        sx={{ width: 80, height: 80 }}
                    />
                </>,
                // lang: <>{item.lang}</>,
                options: <>
                    <MDButton variant="text" color="error" onClick={() => { deleteItem(item.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/items/edit/${item.id}`}>
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
        async function getItem() {
            const data = await fetch(`http://localhost:3000/items`, {
                method: 'Get',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            const items = await data.json()
            setRows(items.data)
        }
        getItem();
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
                                            items List
                                        </MDTypography>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/items/add'>
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

export default Item;