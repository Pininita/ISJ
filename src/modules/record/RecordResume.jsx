import React, {useEffect, useState} from 'react';

function RecordResume({transactions}) {
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [netBalance, setNetBalance] = useState(0)

    // const trans = transactions.transactions.map((t) => t.quantity)
    // console.log(transactions.transactions)

    useEffect(() => {
        if (transactions && Array.isArray(transactions)) {
            const income = transactions
                .filter((t) => t.type === 'ingreso')
                .reduce((sum, transaction) => sum + Number(transaction.quantity), 0)

            const expense = transactions
                .filter((t) => t.type === 'egreso')
                .reduce((sum, transaction) => sum + Number(transaction.quantity), 0)

            const balance = income - expense

            setTotalIncome(income);
            setTotalExpense(expense);
            setNetBalance(balance);
        }
    }, [transactions])

    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <div className="p-4 rounded-lg shadow-md flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-4">Resumen Financiero</h2>

            <div className="md:grid md:grid-cols-3 md:gap-4 md:mb-4 flex flex-col gap-4 ">
                <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-sm text-green-800">Total Ingresos</p>
                    <p className="text-2xl font-bold text-green-600">${formatter.format(totalIncome)}</p>
                </div>

                <div className="bg-red-100 p-3 rounded-lg">
                    <p className="text-sm text-red-800">Total Egresos</p>
                    <p className="text-2xl font-bold text-red-600">${formatter.format(totalExpense)}</p>
                </div>

                <div className={`p-3 rounded-lg ${netBalance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                    <p className={`text-sm ${netBalance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Balance Neto</p>
                    <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                        ${formatter.format(netBalance)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecordResume;