import './new-field.css'
import { useEffect, useState } from 'react';
import Choice from '../choice/choice';
export default function NewField({ addField }) {
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [choices, setChoices] = useState([]);
    const [fieldLabel, setFieldLabel] = useState();
    const [labelError, setLabelError] = useState(false);
    const [fieldType, setFieldType] = useState('text');
    let [choicesAmount, setChoicesAmount] = useState(0);
    //----------------------------------------------------
    useEffect(() => {
        if (choices.length == 0) {
            addChoice()
        }
    }, [multipleChoice, choices])
    //----------------------------------------------------
    const typeChosen = val => {
        setFieldType(val);
        val === 'radio' || val === 'select' || val === 'checkbox' ? setMultipleChoice(true) : setMultipleChoice(false)
    }
    //----------------------------------------------------
    const addChoice = () => {
        let newChoices = choices
        newChoices.push({ name: '', number: choicesAmount++ })
        setChoices(newChoices);
        setChoicesAmount(choicesAmount)
    }

    //----------------------------------------------------
    const addFieldToForm = () => {
        if(!fieldLabel) {
            setLabelError(true);
            return;
        }else{
            setLabelError(false);

        }
        addField({
            label: fieldLabel,
            type: fieldType,
            choices
        })
    }
    //----------------------------------------------------
    const setChoiceTitle = (title, num) => {
        let newChoices = choices
        newChoices[num].name = title
        setChoices(newChoices)
    }
    //----------------------------------------------------
    return (
        <div className="new-field">
            <div className="new-field-label">
                <div className="formGroup">
                    <h2>New field</h2>
                    <label htmlFor="new-field-label">Field label</label>
                    <input type="text" name="new-field-label" onChange={e => setFieldLabel(e.target.value)} placeholder="Choose a title" />
                </div>
            </div>
            <div className="formGroup">
                <label htmlFor="fied-type">Field type</label>
                <div className="new-field-type flex">
                    <div className="radio">
                        <input type="radio" checked name="field-type" id="text" value="text" onChange={e => typeChosen(e.target.value)} />
                        <label htmlFor="text">Single line text</label>
                    </div>
                    <div className="radio">
                        <input type="radio" name="field-type" id="textArea" value="textarea" onChange={e => typeChosen(e.target.value)} />
                        <label htmlFor="textArea">Paragraph</label>
                    </div>
                    <div className="radio">
                        <input type="radio" name="field-type" value="radio" id="radio" onChange={e => typeChosen(e.target.value)} />
                        <label htmlFor="radio">Radio Buttons</label>
                    </div>
                    <div className="radio">
                        <input type="radio" name="field-type" value="checkbox" id="checkbox" onChange={e => typeChosen(e.target.value)} />
                        <label htmlFor="checkbox">Checkboxes</label>
                    </div>
                    <div className="radio">
                        <input type="radio" name="field-type" value="select" id="select" onChange={e => typeChosen(e.target.value)} />
                        <label htmlFor="select">Dropdown</label>
                    </div>
                </div>
            </div>
            {multipleChoice && <div className="formGroup">
                <div className="label-wrap">

                    <label htmlFor="">Choices</label>
                    <div className="add-choice" onClick={addChoice}>+ Add choice</div>
                </div>
                <div className="choices">
                    {choices.map(e => <Choice number={e.number} name={e.name} setChoiceTitle={setChoiceTitle} />)}
                </div>
            </div>
            }
            <button onClick={addFieldToForm}>Add this field</button>
            <span>{labelError ? 'Please choose a label' : ''}</span>
        </div>
    )
}