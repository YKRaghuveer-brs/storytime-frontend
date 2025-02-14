// To update the password 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdatePasswordAPIMutation } from "../../store/user/userApiSlice";
import { toast } from "react-toastify";


const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const initialValues = { password: "", confirmPassword: "" };

const UpdatePassword = () => {
  const [updatePasswordAPI, { isLoading }] = useUpdatePasswordAPIMutation();

  const handleSubmit = async (values, {  resetForm }) => {
    try {
      const response = await updatePasswordAPI({
        password: values.password,
      }).unwrap();
      toast.success(response.message);
      resetForm();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    console.log(values)
    resetForm();
  };

  return (
    <div>
      {isLoading && <div className="grid place-items-center mb-3">
        <img className="w-16 h-16" src="./images/Spiral_logo_loader.gif" alt="Workflow" />
      </div>}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-2xl">
          <br />
          <h3>Reset Password</h3>

          <div className="mb-8">
            <label className="text-white text-xs mb-3">New Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
            />

            <ErrorMessage className="err_msg" name="password" component="div" />
          </div>

          <div className="mb-8">
            <label className="text-white text-xs mb-3">
              Confirm New Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
            />

            <ErrorMessage
              className="err_msg"
              name="confirmPassword"
              component="div"
            />
          </div>

          <div className="d-grid gap-2 mt-7">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 btnPurpleColor ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
              }`}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default UpdatePassword;