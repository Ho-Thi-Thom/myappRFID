export const GET_PRODUCT = `
    *[_type == 'product'] {
        _id,
        name,
        price,
    }
`;
