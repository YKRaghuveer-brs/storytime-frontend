
// To update the user preference 
import { Formik, Form } from "formik";
import { useGetLanguagesQuery } from "../../store/language/languageApiSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { setUserProfile, toggleLanguageSelection } from "../../store/user/authSlice";
import { useGetUserProfileAPIQuery, useUpdateLanguageAPIMutation } from "../../store/user/userApiSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";




const Preference = () => {
  const dispatch = useDispatch();
  const [submitBtn, setSubmit] = useState(false);


  const {data, isLoading: uDataLoad, refetch: refetchUserInfo} = useGetUserProfileAPIQuery(); // user Data from database
  const { data: languages, isLoading, error } = useGetLanguagesQuery();
  const { userData } = useSelector((state) => state.auth);
  
  
  
  
    useEffect(() => {
        if (!uDataLoad) {
            dispatch(setUserProfile({ ...data }));
            //  console.log(data); 
        }
    }, [uDataLoad, data, dispatch]);
    useEffect(() => {
      refetchUserInfo();
    }, [])
    
  
  const [updateLanguageAPI ] =
    useUpdateLanguageAPIMutation();

  const isLanguageSelected = (languageId) =>
    userData.languages && userData.languages.includes(languageId);
  
  const handleLanguageClick = (languageId) => {
    dispatch(toggleLanguageSelection(languageId));
  };


  const submitHandler = async () => {
    setSubmit(true)
    try {
      const response = await updateLanguageAPI({
        languageIds: userData.languages,
      }).unwrap();

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setSubmit(false)

  };

  return (
    <div>
      {submitBtn && <div className="grid place-items-center mb-3">
        <img className="w-16 h-16" src="./images/Spiral_logo_loader.gif" alt="Workflow" />
      </div>}
      <Formik>
        <Form>
          <h3 className="text-2xl text-white font-semibold tracking-tight">
            Languages
          </h3>

          <div className="grid grid-cols-6 gap-x-6 gap-y-6 mt-3">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <p>Unable to load languages. Please try again later.</p>
            ) : (
              (languages &&
              languages.map((language) => (
                <div key={language._id}>
                  <div
                    className={`bg-transperent border p-4 rounded-lg hover:bg-active group active text-center
                       ${ 
                      isLanguageSelected(language._id)
                        ? "bg-blueBack border-none"
                        : ""
                    }`
                  }
                    onClick={() => handleLanguageClick(language._id)}
                  >
                    <p className="line-clamp-2 text-link text-xl mt-1">
                      {language.name}
                    </p>
                  </div>
                </div>
              ))
            ))}
          </div>

          <div className="d-grid gap-2 mt-8">
            <button
              type="submit"
              onClick={submitHandler}
              disabled={submitBtn}
              className={`py-2 px-4 btnPurpleColor ${
                (submitBtn)
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
              }`}
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Preference;
