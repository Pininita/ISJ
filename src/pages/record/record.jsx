import React from 'react';
import InventoryTable from "../../modules/home/InventoryTable.jsx";
import RecordResume from "../../modules/record/RecordResume.jsx";

const RecordPage = () => {

    const data = [
        {
            type: "ingreso",
            quantity: 5000,
            date: "10/09/24",
            city: "Armenia",
            place: "Unicentro",
            description: "Venta"
        },
        {
            type: "egreso",
            quantity: 2000,
            date: "11/10/24",
            city: "Circasia",
            place: "Bodega",
            description: "Mercancia"
        },
        {
            type: "ingreso",
            quantity: 6000,
            date: "10/09/24",
            city: "Armenia",
            place: "Unicentro",
            description: "Venta"
        }
    ]

    return (
        <div>
            <RecordResume transactions={data}/>
            <InventoryTable/>
        </div>
    );
};

export default RecordPage;