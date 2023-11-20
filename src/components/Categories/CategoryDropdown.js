    import React, { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux';
    import Select from 'react-select';
    import { fetchCategoriesAction } from '../../redux/slices/category/categorySlices';


    export default function CategoryDropdown(props) {
        //dispacth action
        const dispatch = useDispatch();
        useEffect(() =>{
            dispatch(fetchCategoriesAction());
        },[]);

        //select categories
        const category = useSelector(state=>state?.category);
        const {categoryList,loading,appErr,serverErr} = category;
        console.log(categoryList)
        const allCategories = categoryList?.map(category =>{
            return {
                label: category?.title,
                value: category?._id
            }
        })
        // console.log(allCategories)

        //handleChange
        const handleChange = (value) => {
            props.onChange("category",value)
        };
        //handleBlur
        const handleBlur = () => {
            props.onBlur("category",true);
        }
    return (
        <div className='my-3 mx-0'>
            {loading ? <h3 className='text-base text-green-600'>please wait...</h3> : <Select onChange={handleChange} onBlur={handleBlur} value={props?.value?.label} id="category" options={allCategories}/>
            }
            {/* Display error */}
            {props?.error && <div className="text-red-500 mt-2">{props?.error}</div>}
        </div>

        
    )
    }
