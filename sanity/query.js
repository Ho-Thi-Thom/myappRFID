export const GET_PRODUCT = `
    *[_type == 'product'] {
        _id,
        barcode,
        name,
        price,
    }
`;
export const GET_WAREHOUSE = `
    *[_type == 'warehouse'] {
        _id,
        name,
    }
`;

export const GET_NAME = `
*[_type == 'product' && barcode.current==$abc] {
    _id,
    barcode,
    name,
}
`;
