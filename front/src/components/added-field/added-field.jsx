export default function AddedField({ type, label, choices }) {
    const field = (type) => {
        switch (type) {
            case 'text':
                return <input type="text" readOnly />
            case 'textarea':
                return <textarea readOnly></textarea>
            case 'radio':
                return choices.map(e => (
                    <div className="added-field-choice">
                        <input type="radio" name={e.number} disabled />
                        <label htmlFor="">{e.name}</label>
                    </div>
                )
                )
            case 'checkbox':
                return choices.map(e => (
                    <div className="added-field-choice">
                        <input type="checkbox" disabled />
                        <label htmlFor="">{e.name}</label>
                    </div>
                )
                )
            case 'select':
                return (
                    <select readOnly>
                        {choices.map(e => (
                            <option>{e.name}</option>
                        )
                        )}
                    </select>
                )

            default:
                break;
        }
    }
    return (
        <div className="formGroup">
            <label htmlFor="">{label}</label>
            {field(type)}
        </div>
    )
}