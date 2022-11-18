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

function Book() {
    const columns = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "name", accessor: "name", align: "left" },
        { Header: "author", accessor: "author", align: "center" },
        { Header: "pagesCount", accessor: "pagesCount", align: "center" },
        { Header: "categoryId", accessor: "categoryId", align: "center" },
        // { Header: "des", accessor: "des", align: "center" },
        { Header: "cover", accessor: "cover", align: "center" },
        { Header: "lang", accessor: "lang", align: "center" },
        { Header: "options", accessor: "options", align: "center" },
    ];
    const [rows, setRows] = useState([]);
    const [tableRows, setTableRows] = useState([])
    const{token}= useContext(AuthContext)
    // console.log("Token is ",token)
    const deleteBook = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            const deleted = await fetch(`${process.env.REACT_APP_API_URL}/books/` + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await deleted.json()
            const remainedRows = rows.filter((book) => {
                return book.id != id
            })
            setRows(remainedRows)
            alert(result.messages.join(' '))
        }

    }
    useEffect(() => {
        const jsxRows = rows?.map((book) => {
        // const categoryName = getCategoryName(book.categoryId)
        // console.log("categoryName", categoryName)
        // console.log("book categories",book.Categories)
        return {
            id: <>{book.id}</>,
            name: <>{book.name}</>,
            author: <>{book.author}</>,
            pagesCount: <>{book.pagesCount}</>,
            categoryId: <>{book?.Category?.name}</>,
            // des: <>{book.des}</>,
            cover: <>
                        <Avatar
                        alt=""
                        variant="square"
                        src={book.cover}
                        sx={{ width: 70, height: 70 }}
                        /> 
                    </>,
            lang: <>{book.lang}</>,
            options: <>
                <MDButton variant="text" color="error" onClick={() => { deleteBook(book.id) }}>
                    <Icon>delete</Icon>&nbsp;delete
                </MDButton>
                <Link to={`/books/edit/${book.id}`}>
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
        async function getBooks() {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/books/all`);
            const books = await data.json()
            setRows(books.data)
        }
        getBooks();
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
                                            books List
                                        </MDTypography>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/books/add'>
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

export default Book;