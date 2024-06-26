import * as React from "react"
import Box from "@mui/material/Box"
import { httpClient } from "../../../services"
import Avatar from "@mui/material/Avatar"

export default function TeacherProfileView(idObject) {
  console.log(idObject)

  const [teacher, setTeacher] = React.useState({})
  const [user, setUser] = React.useState({})
  const [subject, setSubject] = React.useState({})

  async function getTeacher() {
    try {
      const id = idObject.idObject
      console.log(id)
      const res = await httpClient.get(`/teacher/${id}`)
      console.log(res)
      setTeacher(res.DT) // Set the teacher state with the fetched data
      setUser(res.DT.User) // Set the user state with the fetched data
      setSubject(res.DT.subject)
      console.log(res.DT) // Log the response data to ensure it's correct
    } catch (error) {
      console.error("Failed to fetch teacher data:", error)
    }
  }

  React.useEffect(() => {
    if (idObject) {
      getTeacher() // Fetch teacher data when the component mounts and id is available
    }
  }, [idObject]) // Dependency array includes id, so it runs when id changes

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          height: "962px",
          "flex-shrink": "0",
          "border-radius": "20px",
          background: "#FFF",
          "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          alignItems: "center",
          paddingTop: "40px",
          paddingLeft: "24%",
          paddingRight: "24%",
          paddingBottom: "40px",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex items-center p-4">
          <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-10 text-left font-Manrope shadow-xl transition-all">
            <div className="flex h-fit w-auto flex-row">
              {user.image != null ? (
                <img className="mr-3 h-36 w-36 rounded-full object-cover" src={user.image}></img>
              ) : (
                <Avatar src="/teacher.png" alt="Student" sx={{ height: 140, width: 140, marginRight: "12px" }} />
              )}
              <div className="flex flex-col">
                <h4 className="pl-10" style={{ fontSize: "28px", marginTop: "20px" }}>{`${teacher.teachername}`}</h4>
              </div>
              <div></div>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="mr-5 flex flex-col">
                  <p style={{ fontSize: "18px", marginTop: "20px" }}>{`username: ${user.username}`}</p>
                  <p
                    style={{ fontSize: "18px", marginTop: "20px" }}
                  >{`Ngày bắt đầu: ${formatDate(teacher.startDate)}`}</p>
                </div>
                <div className="flex flex-col">
                  <p
                    style={{ fontSize: "18px", marginTop: "20px" }}
                  >{`Giới tính: ${teacher.gender === "1" ? "Nam" : "Nữ"}`}</p>
                  <p style={{ fontSize: "18px", marginTop: "20px" }}>{`Môn học phụ trách: ${subject.subjectname}`}</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </Box>
    </div>
  )
}
