import CardClass from "../../components/share/CardClass"
// import CardGrade from "../../components/share/CardGrade"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import IconButton from "@mui/material/IconButton"
import Dropdown from "../../components/share/Dropdown"
import { useEffect, useState } from "react"
import { grades } from "../../components/share/Dropdown/data"
import { classApi } from "../../apis"
// eslint-disable-next-line
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

export default function Class() {
  function maxGradeYear() {
    console.log("goi maxGradeYear")
    let maxYear = grades[0].year
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].year > maxYear) maxYear = grades[i].year
    }
    return maxYear
  }
  let maxYear = maxGradeYear()
  let [selectYear, setSelectYear] = useState(maxYear)
  let [dataClassGrade10, setDataClassGrade10] = useState("")
  let [dataClassGrade11, setDataClassGrade11] = useState("")
  let [dataClassGrade12, setDataClassGrade12] = useState("")
  const fetchAllClassByGrade10AndYear = async () => {
    let getData = await classApi.getAllClassByGradeAndYear(10, selectYear)
    setDataClassGrade10(getData.DT)
  }
  const fetchAllClassByGrade11AndYear = async () => {
    let getData = await classApi.getAllClassByGradeAndYear(11, selectYear)
    setDataClassGrade11(getData.DT)
  }
  const fetchAllClassByGrade12AndYear = async () => {
    let getData = await classApi.getAllClassByGradeAndYear(12, selectYear)
    setDataClassGrade12(getData.DT)
  }
  useEffect(() => {
    console.log("Chay useEffect")
    console.log("Doi selectyear: " + selectYear)
    fetchAllClassByGrade10AndYear()
    fetchAllClassByGrade11AndYear()
    fetchAllClassByGrade12AndYear()
  }, [selectYear])
  console.log(dataClassGrade10)
  console.log(dataClassGrade11)
  console.log(dataClassGrade12)
  return (
    <Box className="mx-14 mt-10 flex flex-col" sx={{ flexGrow: 1 }}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
            <p className="text-gradeTitle text-center text-2xl font-semibold">Khối 10</p>
          </div>
          <IconButton size="large">
            <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
          </IconButton>
        </div>
        <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade10 && dataClassGrade10.map(({ id, classname }) => <CardClass key={id} nameclass={classname} />)}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
          <p className="text-gradeTitle text-center text-2xl font-semibold">Khối 11</p>
        </div>
        <IconButton size="large">
          <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade11 && dataClassGrade11.map(({ id, classname }) => <CardClass key={id} nameclass={classname} />)}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
          <p className="text-gradeTitle text-center text-2xl font-semibold">Khối 12</p>
        </div>
        <IconButton size="large">
          <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade12 && dataClassGrade12.map(({ id, classname }) => <CardClass key={id} nameclass={classname} />)}
      </div>
    </Box>
  )
}
