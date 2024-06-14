import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from 'axios'
import { toBoolean } from "../utils"


type ProductData = {

    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {

    try {
        const result = DraftProductSchema.safeParse({
            name: data.name,
            price: +data.price
        })

        console.log(result)

        if (result.success) {

            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.data.name,
                price: result.data.price
            })


        } else {
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error)
    }
}


export async function getProducts() {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = ProductsSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        } else {
            throw new Error('Hubo un error mostrando los datos')

        }

    } catch (error) {
        console.log(error)

    }

}


export async function getProductById(id: Product['id']) {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = ProductSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        } else {
            throw new Error('Hubo un error mostrando los datos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function editProduct(data: ProductData, id: Product['id']) {

    try {
        const result = ProductSchema.safeParse({
            id: id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })

        console.log(result)

        if (result.success) {

            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, {
                id: result.data.id,
                name: result.data.name,
                price: result.data.price,
                availability: result.data.availability
            })


        } else {
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)
}

export async function updateAvailability(id: Product['id']) {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)

}