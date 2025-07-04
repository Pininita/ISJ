import React from 'react';
import InventoryTable from "@/modules/home/InventoryTable.jsx";
import RecordResume from "@/modules/record/RecordResume.jsx";

const RecordPage = () => {
    return (
        <div>
            <RecordResume />
            <InventoryTable/>
        </div>
    );
};

export default RecordPage;