import SideBar from "../../share/SideBar"
import PropTypes from "prop-types"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import PreLoader from "../PreLoading"
export default function DefaultLayout({ children }) {
  return (
    <div className="relative m-0 overflow-hidden p-0">
      <PreLoader></PreLoader>
      <Grid container component="main" sx={{ height: "100vh", transitionDelay: "10s", overflow: "hidden" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} lg={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <SideBar />
        </Grid>
        <Grid sx={{ overflow: "hidden" }} item xs={12} sm={8} lg={10} elevation={6}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
