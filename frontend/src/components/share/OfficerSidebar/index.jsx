import { useEffect, useState } from "react" // For managing drawer state
import { MainTheme } from "../../../assets/Theme"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import LOGO from "../../../assets/Logo/Black and White Collection 15.svg"
import { Link, NavLink } from "react-router-dom"
import { MdOutlineDashboard } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { routes } from "../../../config"
import { jwtDecode } from "jwt-decode"
import { Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../../hooks"
import { RiProfileLine } from "react-icons/ri"
import { MdChangeHistory } from "react-icons/md"
const defaultTheme = MainTheme
import { useNavigate } from "react-router-dom"
export default function OfficerSidebar() {
  const navigate = useNavigate()
  let role = localStorage.getItem("role")
  if (role != 3) {
    navigate("/login")
  }
  const { logOut } = useAuth()
  const [selectedIndex, setSelectedIndex] = useState(() => parseInt(localStorage.getItem("selectedIndex")) || 0)
  useEffect(() => {
    console.log("selectedIndex", selectedIndex)
    localStorage.setItem("selectedIndex", selectedIndex)
  }, [selectedIndex])
  const token = localStorage.getItem("accessToken")
  const decode = jwtDecode(token)
  console.log("DECODE", token)
  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }

  return (
    <div style={{ position: "fixed" }}>
      <ThemeProvider theme={defaultTheme}>
        <div className=" flex h-screen w-[220] flex-col content-center border-r-2 bg-sidebar p-3 align-middle shadow">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <img src={LOGO} alt="Logo" style={{ width: "50px", height: "50px", padding: "3px" }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: "10px",
                fontWeight: "bold",
                color: "gray",
                background: "linear-gradient(272deg, #059669 22.06%, #00D995 116.84%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Manrope",
              }}
            >
              Student<br></br>Management
            </Typography>
          </div>
          <NavLink
            key={0}
            onClick={() => handleListItemClick(0)}
            className={
              selectedIndex == 0
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.OfficerTuition}
          >
            <div className="flex items-center">
              <MdOutlineDashboard />
              <span className="ml-3">Tuition</span>
            </div>
          </NavLink>
          <NavLink
            key={1}
            onClick={() => handleListItemClick(1)}
            className={
              selectedIndex == 1
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.OfficerDiscipline}
          >
            <div className="flex items-center">
              <MdChangeHistory />
              <span className="ml-3">Discipline</span>
            </div>
          </NavLink>
          <NavLink
            key={2}
            onClick={() => handleListItemClick(2)}
            className={
              selectedIndex == 2
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.OfficerProfile}
          >
            <div className="flex items-center">
              <RiProfileLine />
              <span className="ml-3">Profile</span>
            </div>
          </NavLink>
          <div className=" mx-auto my-2 h-2 w-11/12 border-t-2 border-gray-400 "></div>
          <div className="flex flex-col">
            <p className="mb-2 font-Manrope  text-base font-semibold text-white">Profile</p>
            <div className="mb-2 flex items-center">
              <FaCircleUser className="mr-2 text-3xl" />
              <div className="flex flex-col font-Manrope">
                <p className=" text-base font-semibold text-white">{decode.payload.username}</p>
                <p className="overflow-ellipsis  text-xs text-neutral-300">{decode.payload.email}</p>
              </div>
            </div>
            <Link to={routes.Login} className="mt-2 flex w-full justify-center ">
              <Button
                onClick={() => logOut()}
                fontFamily="Manrope"
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
              >
                <Typography
                  component="div"
                  sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                  }}
                >
                  Log Out
                </Typography>
              </Button>
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
