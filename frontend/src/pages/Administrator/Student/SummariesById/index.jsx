import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { toast } from "react-toastify"
import { createColumnHelper } from "@tanstack/react-table"
import { useParams } from "react-router"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { IconButton } from "@mui/material"
import { GrLinkPrevious } from "react-icons/gr"
import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { summaryApi } from "../../../../apis"
export default function StudentSummariesTable() {
  const [data, setData] = useState("")
  const [listSubjectResult, setListSubjectResult] = useState("")
  const navigate = useNavigate()
  const HandlePrevious = () => {
    navigate("/student")
  }
  const { id } = useParams()
  const fetchAllSummariesByStudentId = async () => {
    let res = await summaryApi.getSummariesById(id)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setData(res.DT)
      console.log("subjectresults", res.DT[0].title)
      setListSubjectResult(res.DT[0].subjectresults)
    }
  }
  useEffect(() => {
    fetchAllSummariesByStudentId()
  }, [])
  const columnHelper = createColumnHelper()
  const columnHelper2 = createColumnHelper()
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.subject.subjectname}`, {
        id: "subjectname",
        header: "Môn",
      }),
      {
        header: "ĐĐGtx",
        columns: [
          columnHelper.accessor((row) => `${row.fifteenMinExam_1}`, {
            id: "fifteenMinExam_1",
            header: "M1",
          }),
          columnHelper.accessor((row) => `${row.fifteenMinExam_2}`, {
            id: "fifteenMinExam_2",
            header: "M2",
          }),
          columnHelper.accessor((row) => `${row.fifteenMinExam_3}`, {
            id: "fifteenMinExam_3",
            header: "M3",
          }),
          columnHelper.accessor((row) => `${row.fifteenMinExam_4}`, {
            id: "fifteenMinExam_4",
            header: "M4",
          }),
        ],
      },
      {
        header: "ĐĐGgk",
        columns: [
          columnHelper.accessor((row) => `${row.fortyFiveMinExam_1}`, {
            id: "fortyFiveMinExam_1",
            header: "V1",
          }),
          columnHelper.accessor((row) => `${row.fortyFiveMinExam_2}`, {
            id: "fortyFiveMinExam_2",
            header: "V2",
          }),
        ],
      },
      columnHelper.accessor((row) => `${row.finalTest}`, {
        id: "finalTest",
        header: "ĐĐGck",
      }),
      columnHelper.accessor((row) => `${row.averageScore}`, {
        id: "averageScore",
        header: "ĐTBM",
      }),
    ],
    [],
  )
  const columnDef2 = useMemo(
    () => [
      columnHelper2.accessor((row) => `${row.gpa}`, {
        id: "gpa",
        header: "ĐTB",
      }),
      columnHelper2.accessor((row) => `${row.title}`, {
        id: "title",
        header: "Học lực",
      }),
      columnHelper2.accessor((row) => `${row.behaviorpoint}`, {
        id: "behaviorpoint",
        header: "ĐĐG",
      }),
      columnHelper2.accessor((row) => `${row.discipline}`, {
        id: "discipline",
        header: "Hạnh kiểm",
      }),
      columnHelper2.accessor((row) => `${row.teachercomment}`, {
        id: "teachercomment",
        header: "Nhận xét",
      }),
    ],
    [],
  )
  const finalData = React.useMemo(() => listSubjectResult, [listSubjectResult])
  const finalData2 = React.useMemo(() => data, [data])
  console.log("FINALDATA2", finalData2)
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  const tableInstance2 = useReactTable({
    columns: columnDef2,
    data: finalData2,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center">
        <button
          onClick={HandlePrevious}
          className="flex h-9 w-9 animate-jump-in content-center items-center justify-center rounded-full bg-gradeTitle"
        >
          <GrLinkPrevious className="text-2xl text-white" />
        </button>
        <p className="ml-6 animate-fade-down font-Manrope text-2xl font-bold text-gradeTitle">Điểm số</p>
      </div>
      <div className="mt-10 flex items-center">
        <p className="ml-6 animate-fade-up font-Manrope text-2xl font-semibold animate-delay-[500ms] ">Lớp: 10</p>
        <p className="ml-6 animate-fade-up font-Manrope text-2xl font-semibold animate-delay-[500ms] ">Học bạ</p>
      </div>
      <div className="mt-10 h-96 overflow-auto">
        <table className="z-0 w-full border-collapse font-Manrope">
          <thead className="w-full">
            {tableInstance.getHeaderGroups().map((header) => {
              return (
                <tr className=" z-10 h-fit" key={header.id}>
                  {header.headers.map((column) => {
                    return (
                      <th
                        className="text-1xl sticky border-b-2 border-r-2 pb-2 text-center font-semibold tracking-wide"
                        key={column.id}
                        colSpan={column.colSpan}
                      >
                        {column.isPlaceholder ? null : flexRender(column.column.columnDef.header, column.getContext())}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody className="animate-fade-down">
            {tableInstance.getRowModel().rows.map((row) => {
              console.log("COLUMN", row)
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    console.log("COLUMN1", cell.column.columnDef.cell)
                    return (
                      <td className=" border-r-2 text-center font-normal" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="overflow-auto">
        <table className="z-0 w-full border-collapse font-Manrope">
          <thead className="w-full">
            {tableInstance2.getHeaderGroups().map((header) => {
              return (
                <tr className=" z-10 h-fit" key={header.id}>
                  {header.headers.map((column) => {
                    return (
                      <th
                        className="text-1xl sticky border-b-2 border-r-2 pb-2 text-center font-semibold tracking-wide"
                        key={column.id}
                        colSpan={column.colSpan}
                      >
                        {column.isPlaceholder ? null : flexRender(column.column.columnDef.header, column.getContext())}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody className="animate-fade-down">
            {tableInstance2.getRowModel().rows.map((row) => {
              console.log("ROW")
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    console.log("COLUMN2", cell.column.columnDef.cell)
                    return (
                      <td className=" border-r-2 text-center font-normal" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
