import React from 'react';
import HomeForm from "../../modules/home/HomeForm.jsx";
import InventoryTable from "../../modules/home/InventoryTable.jsx";

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center">
            <HomeForm/>
            <InventoryTable/>
        </div>
    );
}

export default HomePage;