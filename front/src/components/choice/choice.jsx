import { useState } from 'react';


export default function Choice({ name, number, setChoiceTitle }) {
    let prefix;
    switch (number) {
        case 1:
            prefix = 'st';
            break;
        case 2:
            prefix = 'nd';
            break;
        case 3:
            prefix = 'rd';
            break;
        default:
            prefix = 'th';
            break;
    }
    if (name) {

        return (
            <div className="choice">

                <span> {(number+1) + prefix} choice:</span> <input type="text" value={name} onChange={e => setChoiceTitle(e.target.value, number)} />
            </div>
        )
    } else {
        return (
            <div className="choice">

                <span> {(number+1) + prefix} choice:</span> <input type="text" onChange={e => setChoiceTitle(e.target.value, number)} />
            </div>
        )

    }
}