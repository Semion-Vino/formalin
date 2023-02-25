import './create.css'
import { useFormik } from 'formik';
import plus from '../../assets/svg/plus'
import { useState } from 'react';
import NewField from '../../components/new-field/new-field'
import AddedField from '../../components/added-field/added-field';
import Swal from 'sweetalert2'
import { useNavigate, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Create = () => {
  const [formFields, setformFields] = useState([]);
  const [newFieldOpen, setNewFieldOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  //------------------------------------------

  const validate = values => {
    const errors = {};
    if (!values.name) errors.name = 'Required';
    if (!values.description) errors.description = 'Required';
    return errors;
  };

  //------------------------------------------

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: values => {
      if (formFields.length === 0) {
        alert('Please add fields to the form')
        return;
      }
      //the object with form data to send
      values.fields = JSON.stringify(formFields);
      values.userId = cookies.user._id;
      fetch('/form/add', {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
        .then((response) => response.json())
        .then((res) => {
          Swal.fire({
            icon: res.form ? 'success' : 'error',
            title: res.form ? 'Created successfully' : 'Something went wrong',
            html: res.form ?
              `<a href="${window.location.origin}/form/${res.form._id}">Go to form page</a>` : '',
            showCloseButton: true,
            showConfirmButton: res.form ? false : true,
          })
        });
    },
  });
  //------------------------------------------
  const addField = (field) => {
    let newFields = formFields;
    newFields.push(field);
    setformFields(newFields);
    setNewFieldOpen(false)
  }
  if (!cookies.user) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Create a new form</h1>
        <form className='writeForm' autoComplete='off' onSubmit={formik.handleSubmit}>

          <div className={`formGroup ${formik.errors.name && 'error'}`}>
            <label htmlFor="name">Name</label>
            {formik.errors.name ? <small>{formik.errors.name}</small> : null}
            <input type="text" name="name" placeholder='Form Name' autoFocus={true} onChange={formik.handleChange}
              value={formik.values.name} />
          </div>
          <div className={`formGroup ${formik.errors.description && 'error'}`}>
            <label htmlFor="description">Description</label>
            {formik.errors.description ? <small>{formik.errors.description}</small> : null}
            <textarea type="text" rows={4} name="description"
              placeholder='Decription of your form' onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
          </div>
          <div className={`formGroup ${formik.errors.fields && 'error'}`}>
            <label htmlFor="fields">Fields</label>
            <div className="added-fields">
              {formFields.map(e => (
                <AddedField type={e.type} label={e.label} choices={e.choices} />

              ))}
            </div>
            <input type="hidden" name="fields" />
            {newFieldOpen && <NewField addField={addField} />}
            <div className="add-field" onClick={e => { setNewFieldOpen(true) }}>
              {plus()}
              <br />
              New field
            </div>
          </div>
          <button type="submit" className='writeButton'>Create Form</button>
        </form>
      </div>
    </div>

  )
};

export default Create;
