import { PdfData } from '@/modules/core/types/pdf'
import { useState } from 'react'

export const usePdfByUrl = () => {
	const [data, setData] = useState<PdfData>()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const fetchPdf = async (url: string) => {
		try {
			setIsLoading(true)
			const response = await fetch(
				`http://localhost:5000/v1/api/pdf/transform/${url}`, {
				method: 'POST',
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
