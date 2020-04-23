import React from 'react';

const Today = ({date}) => {
    return (
        <div>{date.toLocaleDateString()}</div>
    )
}

export default Today;
