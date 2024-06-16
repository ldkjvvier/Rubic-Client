import { PdfData } from '@/modules/core/types/pdf'
import { useState } from 'react'

export const usePdfByFile = () => {
	const [data, setData] = useState<PdfData>()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const fetchPdf = async (file: FormData) => {
		try {
			setIsLoading(true)
			const response = await fetch(
				`http://localhost:5000/v1/api/transform/upload`,
				{
					method: 'POST',
					body: file,
				}
			)
			const data = await response.json()
			console.log(data)
			setData(data)
		} catch (error) {
			setError('Error fetching data')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { data, error, isLoading, fetchPdf }
}
