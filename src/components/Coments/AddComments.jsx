import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddComment.css"; // Assume you have an external CSS file for styles
import { useDispatch, useSelector } from 'react-redux';
import { createCommentsAction } from "../../redux/slices/comments/CommentSlices";

const formSchema = Yup.object({
    description: Yup.string().required("Description is required"),
});



const AddComment = ({ postId }) => {
    const dispatch = useDispatch();
    //select data from store
    const comment = useSelector(state => state?.comment);
    const {loading,appErr,serverErr} = comment
    // console.log(props)
    const formik = useFormik({
        initialValues: {
            description: "",
        },
        onSubmit: values => {
            const data = {
                postId,
                description: values?.description
            }
            // console.log(data);
            // dispatch action
            dispatch(createCommentsAction(data))
        },

        validationSchema: formSchema
    })
    return (
        <div className="add-comment-container">
             {/* Error */}
            {appErr || serverErr ? <h3 className="text-red-500 text-center">{appErr} {serverErr}</h3> : null}

            <form className="comment-form" onSubmit={formik.handleSubmit}>
               
                <input
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    type="text"
                    name="description"
                    id="description"
                    className="comment-input"
                    placeholder="Add New comment"
                />
               {loading ?  <button disabled className="submit-button-loading">
                    Please wait...
                </button>: <button type="submit" className="submit-button">
                    Submit
                </button>}
            </form>
            {/* {formik.touched.description && formik.errors.description && ( */}
            <div className="error-message">
                {formik.errors.description}
            </div>
            {/* )}  */}
        </div>
    );
};

export default AddComment;
