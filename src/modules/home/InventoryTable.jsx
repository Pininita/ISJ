import React from 'react';
import DataTable from 'react-data-table-component';
import { FaChevronDown } from 'react-icons/fa';

const InventoryTable = () => {
  const columns = [
    {
      name: 'Tipo',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Ciudad',
      selector: row => row.city,
      sortable: true,
    },
    {
      name: 'Lugar',
      selector: row => row.place,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.description,
      sortable: false,
      wrap: true,
    },
  ];

  const data = [
    {
      type: 'ingreso',
      quantity: 5000,
      date: '10/09/24',
      city: 'Armenia',
      place: 'Unicentro',
      description: 'Venta',
    },
    {
      type: 'egreso',
      quantity: 2000,
      date: '11/10/24',
      city: 'Circasia',
      place: 'Bodega',
      description: 'Mercancia',
    },
    {
      type: 'ingreso',
      quantity: 6000,
      date: '10/09/24',
      city: 'Armenia',
      place: 'Unicentro',
      description: 'Venta',
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor: '#e0f2fe', // azul muy claro
        color: '#1e40af', // azul oscuro
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        padding: '14px 16px',
        borderBottom: '1px solid #dbeafe',
      },
    },
    rows: {
      style: {
        borderRadius: '6px',
      },
      highlightOnHoverStyle: {
        backgroundColor: '#bfdbfe', // azul claro más marcado
        borderBottomColor: '#93c5fd',
        borderRadius: '6px',
        outline: '1px solid #93c5fd',
      },
    },
    table: {
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)', // sombra suave azulada
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #dbeafe',
        backgroundColor: '#f0f9ff',
        padding: '12px 16px',
      },
    },
  };

  return (
    <div className="p-4">
      <DataTable
        title={<h2 className="text-2xl font-bold text-blue-700 mb-4">Últimos Datos</h2>}
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
        highlightOnHover
        defaultSortFieldId={1}
        sortIcon={<FaChevronDown />}
        responsive
      />
    </div>
  );
};

export default InventoryTable;
