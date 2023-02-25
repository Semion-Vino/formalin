import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Field from '../../components/field/field'
import './Form.css'
import { Formik } from 'formik';
import Swal from 'sweetalert2'

export default function Form() {
    const { formId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState()
    const [fieldNames, setfieldNames] = useState()

    //-----------------------------------------------

    useEffect(() => {
        //retrieve form data
        fetch(`/form/get/${formId}`)
            .then((response) => response.json())
            .then((res) => {
                res.success ? setFormData(res.data) : navigate("*")
                const names = {}
                JSON.parse(res.data.fields).map(e => {
                    names[slugify(e.label)] = ''
                })
                setfieldNames(names);
            })
    }, []);
    //-----------------------------------------------
    const sendForm = values => {
        fetch(`/form/submit/${formId}`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    Swal.fire({
                        icon: res.success ? 'success' : 'error',
                        title: res.success ? 'Submitted successfully' : 'Something went wrong',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: 'top-end',
                        toast: true,
                    })
                }
            })
    }
    //-----------------------------------------------
    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '_')
            .replace(/^-+|-+$/g, '');
    //-----------------------------------------------

    if (!formData || !fieldNames) return ('');
    return (
        <div className="form section__padding">

            <h1>{formData.name}</h1>
            <p>{formData.description}</p>
            <div className="form-wrap">
                <Formik
                    initialValues={fieldNames}
                    onSubmit={(values, actions) => {
                        sendForm(values);
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            {JSON.parse(formData.fields).map(e => (
                                <div className="formGroup">
                                    <label htmlFor="">{e.label}</label>
                                    <Field fieldData={e} name={slugify(e.label)} change={props.handleChange} />
                                </div>
                            ))}
                            <button type="submit" className='primary-btn'>Submit</button>
                        </form>
                    )}
                </Formik>

            </div>

        </div>
    )

}