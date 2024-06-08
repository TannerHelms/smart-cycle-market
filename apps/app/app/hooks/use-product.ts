import { runAxiosAsync } from "app/api/run-axios-async"
import { useMemo, useState } from "react"
import { Product, Products } from "types/product"
import useClient from "./use-client"
import { showMessage } from "react-native-flash-message"


export const useListings = () => {
    const { authClient } = useClient()
    const [listings, setListings] = useState<Product[]>([])
    const [loading, isLoading] = useState(false)

    useMemo(async () => {
        isLoading(true)
        const res = await runAxiosAsync(authClient.get('/product/listings')) as Products
        setListings(res.products)
        isLoading(false)
    }, [])

    const deleteListing = async (id: string) => {
        isLoading(true)
        const res = await runAxiosAsync<{ message: string }>(authClient.delete(`/product/${id}`))
        if (res) {
            setListings(listings.filter(product => product._id !== id))
            showMessage({ message: res.message, type: 'success' })

        }
        isLoading(false)
        return res
    }

    return { listings, loading, deleteListing }
}