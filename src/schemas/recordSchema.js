import * as yup from "yup";

export const recordSchema=yup.object().shape({
    sName: yup.string().required("Please enter a student name"),
    coursename: yup.string().required("Please enter a coursename"),
    date: yup.string().required("Plese enter Date enrolled"),
    studentId: yup.string().required("Please enter a studentId"),
    mainExamName: yup.string(),
    mainExamMT: yup.number(),
    mainExamMO: yup.number(),
    secretKey: yup.number().required("Please enter a secret key to add record"),
    
})

export const initialValuesRecord = {
    sName: "",
    coursename: "",
    date: "",
    studentId:"",
    mainExamName: "",
    mainExamMT: "",
    mainExamMO: "",
    secretKey:""
  };

export const passcodeSchema=yup.object().shape({
    oldpasscode: yup.string().required("Please enter a old passcode"),
    newpasscode: yup.string().required("Please enter a new passcode"),
    confirmpasscode: yup.string().required("Plese enter new passcode again"),
})
export const OTPSchema=yup.object().shape({
    otp: yup.string().required("Please enter OTP recieved"),
    newpassword: yup.string().required("Please enter a new password"),
    confirmpassword: yup.string().required("Plese enter new password again"),
    email: yup.string().required("Plese enter Email"),
})

export const initialValuesOTP = {
    otp: "",
    newpassword: "",
    confirmpassword: "",    
    email:""
  };
export const initialValuesPasscode = {
    oldpasscode: "",
    newpasscode: "",
    confirmpasscode: "",    
  };

export const passwordSchema=yup.object().shape({
    oldpassword: yup.string().required("Please enter a old password"),
    newpassword: yup.string().required("Please enter a new password"),
    confirmpassword: yup.string().required("Plese enter new password again"),
   
    
})

export const initialValuesPassword = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",    
  };