import * as yup from "yup";

export const registerSchema=yup.object().shape({
    email: yup.string().email("invalid email").required("Please enter a email"),
    password: yup.string().required("Please enter a password"),
    secretkey: yup.string().required("Plese enter a secret key"),
    username: yup.string().required("Please enter a username"),
})

export const initialValuesRegister = {
    email: "",
    password: "",
    secretkey:"",
    username:"",
  };
export const loginSchema=yup.object().shape({
    email: yup.string().email("invalid email").required("Please enter a email"),
    password: yup.string().required("Please enter a password"),
   
})

export const adminloginSchema=yup.object().shape({
    email: yup.string().email("invalid email").required("Please enter a email"),
    password: yup.string().required("Please enter a password"),
   
})

export const initialValuesLogin = {
    email: "",
    password: "",
    
  };
export const initialValuesAdminLogin = {
    email: "",
    password: "",
    
  };