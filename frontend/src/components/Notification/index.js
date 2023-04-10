import './index.css'
import { useRef, useState, useEffect } from 'react'

function Notification({ messages }) {
    const [ _, forceUpdate ] = useState()
    const messagesCounter = useRef(0)

    useEffect(() => {
        messages.current = messages.current.map(item => {
            if (typeof item === 'string') {
                const id = messagesCounter.current
                const newItem = {
                    id: id,
                    message: item
                }
                setTimeout(() => {
                    let indexToRemove = messages.current.findIndex(item => item.id === id)
                    messages.current.splice(indexToRemove, 1)
                    forceUpdate({})
                }, 3000)
                messagesCounter.current++
                forceUpdate({})
                return newItem
            }
            forceUpdate({})
            return item
        })
    }, [messages.current.length])

    return (
        <div className="Notification">
            { messages.current.filter(item => typeof item !== 'string').map((item) => (
                <div key={item.id} className="Notification-item">
                    {item.message}
                </div>
            ))}
        </div>
    )
}

export default Notification
