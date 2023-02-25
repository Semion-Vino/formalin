export default function Field({ fieldData, change, name }) {

    if (fieldData.type == 'text') {
        return (<input name={name} type='text' onChange={change} />)
    } else if (fieldData.type == 'textarea') {
        return (<textarea name={name} onChange={change}></textarea>)
    } else if (fieldData.type == 'radio' || fieldData.type == 'checkbox') {
        return (
            fieldData.choices.map(e => (
                <div className="label-input">
                    <input type={fieldData.type} value={e.name} onChange={change} name={name} id={e.name} />
                    <label htmlFor={e.name}>{e.name}</label>
                </div>

            )))
    } else if (fieldData.type == 'select') {
        return (
            <select name={name} id="" onChange={change} >
                {
                    fieldData.choices.map(e => (
                        <option value={e.name}>{e.name}</option>

                    ))
                }
            </select>
        )
    }
}