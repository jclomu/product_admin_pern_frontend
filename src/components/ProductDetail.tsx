import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }

    return redirect('/')
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-green-600' : 'text-red-600'} text-center rounded-lg text-xs font-bold w-full p-2 uppercase border border-black-100 hover:cursor-pointer hover:bg-gray-200`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-indigo-600 hover:opacity-90 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        onClick={() => navigate(`products/${product.id}/edit`,)}
                    >Editar</button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm(`¿eliminar ${product.name}?`)) {
                                e.preventDefault()
                            }
                        }}
                    >

                        <input
                            type="submit"
                            value='Eliminar'
                            className="bg-red-600 hover:opacity-80 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>

                </div>
            </td>
        </tr>)
}
