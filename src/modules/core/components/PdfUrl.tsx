import { usePdfByUrl } from '../hooks/usePdfByUrl'
import { Loading } from '@/components/loader/Loading'
import { PdfCard } from '../components/PdfCard'

export const PdfUrl = (): JSX.Element => {
	const { data, error, isLoading, fetchPdf } = usePdfByUrl()
	if (isLoading) return <Loading />
	if (error) return <div>{error}</div>

	const handleSubmitUrl = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const url = formData.get('pdf-url') as string
		const encodedPdfUrl = encodeURIComponent(url)
		fetchPdf(encodedPdfUrl)
	}
	return (
		<div>
			<form action="submit" onSubmit={handleSubmitUrl}>
				<input
					type="text"
					name="pdf-url"
					placeholder="Ingresa una url"
          required
				/>
				<button>ADD</button>
				<div>{data && <PdfCard {...data} />}</div>
			</form>
		</div>
	)
}
