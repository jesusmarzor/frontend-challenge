import { useEffect, useState } from "react"
import { getProducts } from "../services/getProducts";

export const useProducts = ({variables}) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({}); 
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        setLoading(true);
        getProducts(variables)
        .then( ({results, pagination}) => {
            setProducts(results);
            setPagination(pagination);
            setLoading(false);
        })
    }, [variables])

    return { products, loading, pagination}
}