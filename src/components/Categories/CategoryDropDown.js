import React from "react";
import Select from "react-select";

const CategoryDropDown = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    return (
        <Select/>
    )
}

export default CategoryDropDown;