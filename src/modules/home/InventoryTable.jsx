import React from 'react';
import DataTable from "react-data-table-component";

const InventoryTable = () => {

    const columns = [
        {
            name: "Tipo",
            selector: row => row.type,
        },
        {
            name: "Cantidad",
            selector: row => row.quantity,
        },
        {
            name: "Fecha",
            selector: row => row.date,
        },
        {
            name: "Ciudad",
            selector: row => row.city,
        },
        {
            name: "Lugar",
            selector: row => row.place,
        },
        {
            name: "Descripcion",
            selector: row => row.description,
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
    ];

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    // Aquí defines los estilos personalizados
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#f3f4f6', // Fondo gris claro
                color: '#1f2937' // Texto gris oscuro
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '12px',
                borderBottom: '1px solid #e5e7eb', // Línea entre filas
            },
        },
        table: {
            style: {
                backgroundColor: '#ffffff', // Fondo blanco
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
            },
        },
    };

    return (
        <div className="p-4">
            <DataTable
                title="Últimos Datos"
                columns={columns}
                data={data}
                pagination
                paginationPerPage={10}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                customStyles={customStyles} // 👈 Aplicamos los estilos aquí
            />
        </div>
    );
}

export default InventoryTable;