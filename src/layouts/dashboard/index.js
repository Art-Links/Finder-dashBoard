/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "context/AuthContext";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";



function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  // const ctx = useContext(AuthContext)

  const [Users, setUsers] = useState([]);
  const [Admins, setAdmins] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Items, setItems] = useState([]);

  // const [users, setCustomer] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/users/all`)
      .then(response => {
        response.json().then(Users => {
          console.log(Users.data.length, "hhhhhhhhhh")
          setUsers(Users?.data)
        })
      })
  }, [])
  console.log("highlighter", Users.length)
  const UsersN = Users.length


  useEffect(() => {
    fetch(`http://localhost:3000/admin`)
      .then(response => {
        response.json().then(Admins => {
          // console.log(Admins.data.length, "hhhhhhhhhh")
          setAdmins(Admins?.data)
        })
      })
  }, [])
  //  console.log("highlighter", Services.length)
  const AdminsN = Admins.length


  useEffect(() => {
    fetch(`http://localhost:3000/category`)
      .then(response => {
        response.json().then(Category => {
          // console.log(review.data.length, "hhhhhhhhhh")
          setCategory(Category?.data)
        })
      })
  }, [])
  //  console.log("highlighter", Category.length)
  const CategoryN = Category.length


  useEffect(() => {
    fetch(`http://localhost:3000/items`)
      .then(response => {
        response.json().then(Items => {
          // console.log(Items.data.length, "hhhhhhhhhh")
          setItems(Items?.data)
        })
      })
  }, [])
  //  console.log("highlighter", Items.length)
  const ItemsN = Items.length


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_add"
                title="Users"
                count={UsersN}
                percentage={{
                  color: "success",
                  // amount: "+55%",
                  // label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person_add"
                title="Admins"
                count={AdminsN}
                percentage={{
                  color: "success",
                  // amount: "+3%",
                  // label: "than last month",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="leaderboard"
                title="Categories"
                count={CategoryN}
                percentage={{
                  color: "success",
                  amount: "",
                  // label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Items"
                count={ItemsN}
                percentage={{
                  color: "success",
                  amount: "",
                  // label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>



        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;