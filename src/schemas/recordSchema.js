import * as yup from "yup";

export const recordSchema=yup.object().shape({
    sName: yup.string().required("Please enter a student name"),
    coursename: yup.string().required("Please enter a coursename"),
    date: yup.string().required("Plese enter Date enrolled"),
    studentId: yup.string().required("Please enter a studentId"),
    picture: yup.string().required("Please select a user picture"),
})

export const initialValuesRecord = {
    sName: "",
    coursename: "",
    date: "",
    studentId:"",
    picture: ""
  };