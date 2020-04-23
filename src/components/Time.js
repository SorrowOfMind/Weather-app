import React from 'react';

const Time = ({date}) => {
    return <div>{date.toLocaleTimeString()}</div>
}

export default Time;
