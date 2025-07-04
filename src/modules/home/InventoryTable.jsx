import DataTable from 'react-data-table-component';
import { FaChevronDown } from 'react-icons/fa';
import { useTransactions } from '../auth/hooks/useTransactions';

const InventoryTable = () => {
  const { transactions, loading, error} = useTransactions()

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

  const columns = [
    
    {
      name: 'Tipo',
      selector: row => row.transactionType,
      sortable: false,
    },
    {
      name: 'Cantidad',
      selector: row => formatter.format(row.amount),
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row =>  new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Ciudad',
      selector: row => row.city,
      sortable: false,
    },
    {
      name: 'Lugar',
      selector: row => row.location,
      sortable: false,
    },
    {
      name: 'Descripcion',
      selector: row => row.description,
      sortable: false,
      wrap: false,
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
        data={sortedTransactions}
        pagination
        paginationPerPage={10}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
        highlightOnHover
        // defaultSortFieldId={1}
        sortIcon={<FaChevronDown />}
        responsive
      />
    </div>
  );
};

export default InventoryTable;
