import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import bcrypt from "bcryptjs"
import { httpClient } from "../../../services"
import { jwtDecode } from "jwt-decode"
import Avatar from "@mui/material/Avatar"
import { teacherApi } from "../../../apis"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { accountApi } from "../../../apis"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { toast } from "react-toastify"

export default function TeacherDelete({
  isOpenTeacherDelete,
  closeTeacherDelete,
  id,
  checkReLoading,
  setCheckReLoading,
}) {
  const [teacher, setTeacher] = React.useState({})
  const [user, setUser] = React.useState({})
  const [subject, setSubject] = React.useState({})

  async function getTeacher() {
    try {
      const res = await httpClient.get(`/teacher/${id}`)
      setTeacher(res.DT) // Set the teacher state with the fetched data
      setUser(res.DT.User) // Set the user state with the fetched data
      setSubject(res.DT.subject)
      console.log(res.DT) // Log the response data to ensure it's correct
    } catch (error) {
      console.error("Failed to fetch teacher data:", error)
    }
  }

  React.useEffect(() => {
    if (id) {
      getTeacher() // Fetch teacher data when the component mounts and id is available
    }
  }, [id]) // Dependency array includes id, so it runs when id changes
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  async function HandleDeleteClick() {
    const res = await teacherApi.deleteTeacher(teacher.id)
    console.log(res)
    if (res.message == "deleted user") {
      toast.success("Xóa thành công")
      setCheckReLoading(!checkReLoading)
      closeTeacherDelete()
    } else {
      toast.error("Xóa thất bại")
    }
  }

  return (
    <Transition appear show={isOpenTeacherDelete} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeTeacherDelete}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center align-middle ">
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Xóa giáo viên
                </Dialog.Title>
                <div className="flex items-center p-4">
                  <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                    <div className="flex h-fit w-auto flex-row">
                      {teacher.User?.image != null ? (
                        <img className="mr-3 h-36 w-36 rounded-full object-cover" src={teacher.User.image}></img>
                      ) : (
                        <Avatar
                          src="/teacher.png"
                          alt="Student"
                          sx={{ height: 150, width: 150, marginRight: "12px", border: "solid" }}
                        />
                      )}
                      <div className="flex flex-col">
                        <h4
                          className="pl-10"
                          style={{ fontSize: "28px", marginTop: "20px" }}
                        >{`${teacher.teachername}`}</h4>
                        <h3 className="pl-10" style={{ fontSize: "22px", marginTop: "20px" }}>{`${user.username}`}</h3>
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div>
                        <div className="flex flex-row">
                          <p
                            className="pl-10"
                            style={{ fontSize: "18px", marginTop: "20px" }}
                          >{`Ngày bắt đầu: ${formatDate(teacher.startDate)}`}</p>
                          <p
                            className="pl-10"
                            style={{ fontSize: "18px", marginTop: "20px", marginLeft: "80px" }}
                          >{`Giới tính: ${teacher.gender === "1" ? "Nam" : "Nữ"}`}</p>
                        </div>
                        <p
                          className="pl-10"
                          style={{ fontSize: "18px", marginTop: "20px" }}
                        >{`Môn học phụ trách: ${subject.subjectname}`}</p>
                        <p
                          className="pl-10"
                          style={{ fontSize: "18px", marginTop: "20px" }}
                        >{`Trạng thái trong năm: ${teacher.statusinyear === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}`}</p>
                        <div className="p-4"></div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="contained" color="error" onClick={HandleDeleteClick}>
                    Xóa
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 4, marginRight: 4 }}
                    onClick={closeTeacherDelete}
                  >
                    Hủy
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
