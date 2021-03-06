import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }
    if (isError === 1) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
}

export default Notification