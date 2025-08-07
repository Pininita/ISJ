import React, {useEffect, useState} from 'react';
import { useMe } from '../auth/hooks/useMe';

function RecordResume({}) {

    const me = useMe();
    const totalIncome = me?.totalIncome
    const totalExpense = me?.totalExpense
    const balance = me?.balance

    // console.log(me);
    

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

                <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                    <p className={`text-sm ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Balance Neto</p>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                        ${formatter.format(balance)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecordResume;