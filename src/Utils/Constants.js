export const ROUTES = {
    DATATABLE: 'Datatable',

    AUTH: 'Auth',
    ROLE: 'Roles',
    USER: 'Users',

    ACTIVEPATIENT: 'Activepatient',
    PATIENT: 'Patient',

    PATIENTTYPE: 'Patienttype',
    PATIENTREPORT: 'Patientreport',
    PATIENTDEFINE: 'Patientdefine',

    COSTUMERTYPE: 'Costumertype',
    CASE: 'Case',
    DEPARTMENT: 'Department',
    FILE: 'File',
    STATION: 'Station',
    STOCKDEFINE: 'Stockdefine',
    UNIT: 'Unit',

    PURCHASEORDER: 'Purchaseorder',
    PURCHASEORDERSTOCK: 'Purchaseorderstock',
    PURCHASEORDERSTOCKMOVEMENT: 'Purchaseorderstockmovement',
    DEACTIVESTOCK: 'Deactivestock',
    STOCK: 'Stock',
    STOCKMOVEMENT: 'Stockmovement',
    WAREHOUSE: 'Warehouse',
    PATIENTSTOCK: 'Patientstock',
    PATIENTSTOCKMOVEMENT: 'Patientstockmovement'
}


export const MOVEMENTTYPES = [
    { Name: "Stokdan düşme", value: -1, color: 'gray' },
    { Name: "Transfer", value: 0, color: 'green' },
    { Name: "Stok Ekleme", value: 1, color: 'orange' },
]