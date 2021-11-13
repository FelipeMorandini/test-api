import { dbQuery, dbQueryFirst } from "../services/loadDbFile";


export type Product = {
    id: number;
    name: string;
    price: number;
};

export const insertProduct = async (product: Product) => {
    await dbQuery(`INSERT INTO product (name, price) VALUES(?, ?)`, [product.name, product.price])
    let id = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'product'`);
    return `Product successfully inserted as ID no. ${id[0].Id as number | undefined}`;
};

const listProducts = async () => {
    const answer = await dbQuery(`SELECT * FROM product`);
    return answer as Product[];
}

const getProduct = async (id: number) => {
    const answer = await dbQueryFirst(`SELECT * FROM product WHERE id = ?`, [id]);
    return answer as Product | undefined;
}

const deleteProduct = async (id: number) => {
    await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id]);
}

export const productModel = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct
}