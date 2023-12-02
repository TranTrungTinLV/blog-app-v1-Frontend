import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import "./AddComment.css"; // Assume you have an external CSS file for styles
import { useDispatch, useSelector } from 'react-redux';
import { updateCommentsAction, fetchCommentsAction } from "../../redux/slices/comments/CommentSlices";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
const formSchema = Yup.object({
    description: Yup.string().required("Description is required"),
});



const UpdateComment = () => {
    const { id } = useParams();
    // console.log(id)
    const dispatch = useDispatch();
    //fetch comment details
    useEffect(() => {
        dispatch(fetchCommentsAction(id))
    }, [dispatch, id])
    //select comment from store
    const comment = useSelector(state => state?.comment);
    const { commentDetails, isUpdated } = comment;
    // console.log(commentDetails)
    // console.log(props)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            description: commentDetails?.description,
        },
        onSubmit: values => {
            const data = {
                id,
                description: values?.description
            }
            console.log(data);
            // dispatch action
            dispatch(updateCommentsAction(data))
        },

        validationSchema: formSchema
    })
    if (isUpdated) return <Navigate to={`/posts`} />
    return (
        <div className="bg-gray-200 h-screen md:h-screen">
            <div className="add-comment-container py-4">
                <form className="comment-form" onSubmit={formik.handleSubmit}>
                    <textarea
                        onBlur={formik.handleBlur("description")}
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        type="text"
                        name="description"
                        id="description"
                        className="comment-input"
                        placeholder="Add New comment"
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
                {/* {formik.touched.description && formik.errors.description && ( */}
                <div className="error-message text-red-400">
                    {formik.errors.description}
                </div>
                {/* )}  */}
            </div>
        </div>
    );
};

export default UpdateComment;
