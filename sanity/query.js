export const GET_PRODUCT = `
    *[_type == 'product'] {
        _id,
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
