import React, {useState} from 'react';
import { useQueryParam } from "gatsby-query-params";


const Order = () => {
    let id = useQueryParam("id")
    const [idOrder, setIsOrder] = useState(id);
    
    return (
        <div>
            <p>{idOrder}</p>
        </div>
    );
};

export default Order;