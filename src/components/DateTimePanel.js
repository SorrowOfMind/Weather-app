import React, {useState, useEffect} from 'react';
import Today from './Today';
import Time from './Time';

const DateTimePanel = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);


    return (
        <div>
        <Today date={date} />
        <Time date={date} />
        </div>
    )
}

export default DateTimePanel;
