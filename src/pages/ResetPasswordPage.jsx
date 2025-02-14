import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  password: "",
  confirmPassword: "",
};
const validateSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const ResetPasswordPage = () => {

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    
    setSubmitting(true);
    
    setTimeout(() => {
      resetForm();    
      setSubmitting(false);
    }, 5000);
  };

  return (
    <>
      <div className="grid place-items-center mb-3">
        <img className="w-16 h-16" src="./images/logo.svg" alt="Workflow" />
      </div>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title py-4 text-center">
                    Reset Password
                  </h3>
                  <hr />

                  <div className="form-group mt-3 px-5 py-2 mx-5">
                    <label>New Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div className="form-group mt-3 px-5 py-2 mx-5">
                    <label>Confirm New Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="confirmPassword"
                      component="div"
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3 px-5 mb-4 mx-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`block w-full py-2 px-4 rounded-xl btnPurpleColor ${
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
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;