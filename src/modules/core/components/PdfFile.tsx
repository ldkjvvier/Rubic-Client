import { usePdfByFile } from '../hooks/usePdfByFile'
import { PdfCard } from './PdfCard'
import { Loading } from '@/components/loader/Loading'
export const PdfFile = () => {
	const { data, error, isLoading, fetchPdf } = usePdfByFile()
	if (isLoading) return <Loading />
	if (error) return <div>{error}</div>

	const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const file = formData.get('pdfFile') as File
    if (!file) return
		const data = new FormData()
		data.append('pdfFile', file)
		fetchPdf(data)
	}

	return (
		<form
			action="submit"
			onSubmit={handleSubmitFile}
			method="post"
			id="contenido"
		>
			<input type="file" name="pdfFile" id="pdfFile" required />
			<button type="submit">ADD</button>
			<div id="elemento-a-imprimir">
				{data && <PdfCard {...data} />}
			</div>
		</form>
	)
}
