import { ActionFunctionArgs, Form, Link, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"





type ProductDetailsProp = {

    product: Product
}


export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }

}

export default function ProductDetails({ product }: ProductDetailsProp) {

    const isAvailable = product.availability
    const fetcher = useFetcher()
    return (

        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}

            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form
                    method="POST" >
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-sm w-full font-bold uppercase cursor-pointer border border-black`}
                    >
                        {isAvailable ? 'Disponible' : 'No disponible'}

                    </button>
                </fetcher.Form>


            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/productos/${product.id}/editar`}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 font-bold uppercase text-xs text-center hover:bg-indigo-800">
                        Editar
                    </Link>
                    <Form className="w-full"
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm(`¿Eliminar ${product.name}?`)) {
                                e.preventDefault()
                            }
                        }}>
                        <input
                            className="bg-red-600 text-white rounded-lg w-full p-2 font-bold uppercase text-xs text-center hover:bg-red-800"
                            type="submit"
                            value="Eliminar" />
                    </Form>


                </div>

            </td>
        </tr>
    )
}
