import './index.css'
import { useEffect, useCallback } from 'react'

function Combo({ options, onChange }) {

    useEffect(() => {
        onChange(options[0])
    }, [options])

    const change = useCallback(event => {
        onChange(event.target.value)
    }, [onChange])

    return (
        <select className="Combo" onChange={change}>
            { options.map(option => (
                <option key={option} value={option} className="Combo-option">
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Combo
