
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './results.css'
export default function Results() {
    const { formId } = useParams();
    const [submits, setSubmits] = useState([]);
    const [formTitle, setFormTitle] = useState();
    useEffect(() => {
        fetch(`/form/get/${formId}`)
            .then((response) => response.json())
            .then((res) => {
                setSubmits(res.data.answers)
                setFormTitle(res.data.name)
            })
    }, []);
    const deslugify = val => {
        return val.replaceAll('_', ' ');
    }
    return (
        <div className='bids section__padding'>
            <div className="bids-container">
                <div className="bids-container-text answers-container">
                    <h1>Form results</h1>
                    <h2>Form name: {formTitle}</h2>
                    {submits.length > 0 ?
                        <div className='submits-wrap'>
                            {submits.map(obj =>
                                <>
                                    <div className="answer">

                                        {Object.entries(obj).map(([key, value]) => (

                                            <div className="field">
                                                <span className="q">Q:</span>
                                                <span className="question-wrap">{deslugify(key)}</span>
                                                <br />
                                                <span className="a">A:</span>
                                                <span className="answer-wrap">{Array.isArray(value) ? value.join(', ') : value}</span>
                                            </div>
                                        ))}

                                    </div>
                                    <hr />
                                </>
                            )}
                        </div>
                        :
                        'No submits yet'}
                </div>
            </div>
        </div>
    )
}