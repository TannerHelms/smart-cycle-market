import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Product } from "types/product";

const initialState: Product[] = []

const slice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        updateListings(_, { payload }: PayloadAction<Product[]>) {
            return payload;
        },
        deleteItem(listings, { payload }: PayloadAction<{ id: string }>) {
            return listings.filter(product => product._id !== payload.id)
        }
    }
})

export const { updateListings, deleteItem } = slice.actions

export const getListings = createSelector(
    (state: RootState) => state,
    state => state.listing
)

export default slice.reducer
