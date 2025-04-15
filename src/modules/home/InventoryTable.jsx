import React from 'react';
import DataTable from "react-data-table-component"

const InventoryTable = () => {

    const columns = [
        {
            name: "Tipo", // Aquí es "name", no "type"
            selector: row => row.type
        },
        {
            name: "Cantidad", // Cambiar "quantity" por "name"
            selector: row => row.quantity
        },
        {
            name: "Fecha",
            selector: row => row.date
        },
        {
            name: "Ciudad",
            selector: row => row.city
        },
        {
            name: "Lugar",
            selector: row => row.place
        },
        {
            name: "Descripcion",
            selector: row => row.description
        }
    ];

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

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    return (
        <div>
            <DataTable
                title="Ultimos Datos"
                columns={columns}
                data={data}
                pagination
                paginationPerPage={10}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    );
}

export default InventoryTable;