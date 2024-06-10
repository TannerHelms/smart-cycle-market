import { runAxiosAsync } from "app/api/run-axios-async";
import { useEffect, useMemo, useState } from "react"
import { Product, ProductListings } from "types/product"
import useClient from "./use-client"
import { showMessage } from "react-native-flash-message"
import { useDispatch, useSelector } from "react-redux"
import { deleteItem, getListings, updateListings } from "store/listings"


export const useListings = () => {
    const { authClient } = useClient()
    const listings = useSelector(getListings)
    const [loading, isLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchListing()
    }, [])

    const fetchListing = async () => {
        isLoading(true)
        const res = await runAxiosAsync(authClient.get('/product/listings')) as ProductListings
        dispatch(updateListings(res.products))
        isLoading(false)
    }

    const del = async (id: string) => {
        isLoading(true)
        const res = await runAxiosAsync<{ message: string }>(authClient.delete(`/product/${id}`))
        if (res) {
            dispatch(deleteItem({ id }))
            showMessage({ message: res.message, type: 'success' })

        }
        isLoading(false)
        return res
    }

    return { listings, loading, deleteListing: del, fetchListing }
}