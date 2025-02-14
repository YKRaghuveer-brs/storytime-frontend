import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRegisterAPIMutation } from "../../store/user/userApiSlice";

const NewUserForm = () => {
  const navigate = useNavigate();
  const [passType, setPassType] = useState("password");
  const [registerAPI, { isLoading }] = useRegisterAPIMutation();
 


  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required").min(3).max(15),
    last_name: Yup.string().required("Last Name is required").min(3).max(15),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required").min(6).max(15),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setPassType("password");
    setSubmitting(true);
    toast.dismiss();

    try {
      const response = await registerAPI(values).unwrap();
      toast.success(response?.message);
      resetForm();
      navigate("/users");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-gray-600 p-6 rounded-xl shadow-lg w-96">
    <div className="flex justify-center mb-3">
      <img className="w-16 h-16" src={isLoading ? './images/Spiral_logo_loader.gif' : './images/logo.svg'} alt="Logo" />
    </div>
  <h3 className="text-center text-lg font-bold text-white">Sign Up</h3>
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
    {({ isSubmitting }) => (
      <Form className="mt-4">
        <div className="mb-3">
          <Field
            type="email"
            name="email"
            disabled={isSubmitting}
            placeholder="Email"
            className="border p-3 w-full rounded-lg bg-white text-gray-900"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="flex gap-2">
          <div className="mb-3 flex-1">
            <Field
              type="text"
              name="first_name"
              disabled={isSubmitting}
              placeholder="First Name"
              className="border p-3 w-full rounded-lg bg-white text-gray-900"
            />
            <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-3 flex-1">
            <Field
              type="text"
              name="last_name"
              disabled={isSubmitting}
              placeholder="Last Name"
              className="border p-3 w-full rounded-lg bg-white text-gray-900"
            />
            <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div className="mb-3">
          <Field
            type={passType}
            name="password"
            disabled={isSubmitting}
            placeholder="Password"
            className="border p-3 w-full rounded-lg bg-white text-gray-900"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-3">
          <Field
            type={passType}
            name="confirmPassword"
            disabled={isSubmitting}
            placeholder="Confirm Password"
            className="border p-3 w-full rounded-lg bg-white text-gray-900"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="flex items-center gap-2">
          <Field type="checkbox" name="acceptTerms" disabled={isSubmitting} className="h-4 w-4" />
          <label className="text-sm text-white">I accept the Terms & Conditions</label>
        </div>
        <ErrorMessage name="acceptTerms" component="div" className="text-red-500 text-sm mt-1" />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white w-full p-3 mt-4 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </button>
      </Form>
    )}
  </Formik>
</div>

  );
};

export default NewUserForm;
