import { PdfData } from '../types/pdf'

export const PdfCard = (data: PdfData) => (
	<div>
		<h2>{data.nombre + ' ' + data.apellido}</h2>

		<p>
			Direccion Juzgado: <span>{data.direccion_juzgado}</span>
		</p>
		<p>
			Fecha y Hora:{' '}
			<span>
				{data.fecha_cita} {data.hora_cita}
			</span>
		</p>
		<p>
      Comuna:{' '}
      <span>
        {
          data.comuna
        }
      </span>
    </p>
	</div>
)
