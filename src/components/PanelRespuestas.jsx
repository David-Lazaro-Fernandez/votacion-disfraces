import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { categorias } from '@/data/categorias'
import { conteoPorDisfraz } from '@/lib/respuestas'

const COLUMNAS = [
  { clave: 'categoriaNombre', titulo: 'Categoría' },
  { clave: 'disfraz', titulo: 'Disfraz' },
  { clave: 'persona', titulo: 'Persona' },
  { clave: 'feedback', titulo: 'Feedback' },
  { clave: 'fecha', titulo: 'Fecha' },
]

const configGrafica = {
  total: { label: 'Respuestas', color: 'var(--chart-1)' },
}

function PanelRespuestas({ respuestas, onBorrar }) {
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState({ clave: 'fecha', direccion: 'asc' })

  const filas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    const filtradas = respuestas
      .map((respuesta, indice) => ({
        ...respuesta,
        numero: indice + 1,
        categoriaNombre: categorias.find(({ id }) => id === respuesta.categoria)?.nombre ?? '—',
      }))
      .filter((fila) =>
        !texto || COLUMNAS.some(({ clave }) => String(fila[clave] ?? '').toLowerCase().includes(texto)),
      )

    const factor = orden.direccion === 'asc' ? 1 : -1
    return filtradas.sort((a, b) => {
      const valorA = String(a[orden.clave] ?? '')
      const valorB = String(b[orden.clave] ?? '')
      return valorA.localeCompare(valorB, 'es') * factor
    })
  }, [respuestas, busqueda, orden])

  const datosGrafica = conteoPorDisfraz(respuestas).slice(0, 10).map((item) => ({
    disfraz: item.nombre,
    total: item.total,
  }))

  function cambiarOrden(clave) {
    setOrden((actual) => ({
      clave,
      direccion: actual.clave === clave && actual.direccion === 'asc' ? 'desc' : 'asc',
    }))
  }

  if (respuestas.length === 0) {
    return <p className="text-center text-muted-foreground">Todavía no hay respuestas.</p>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Disfraces más mencionados</CardTitle>
          <CardDescription>Top 10 por número de respuestas.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={configGrafica} className="h-72 w-full">
            <BarChart data={datosGrafica} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="disfraz" type="category" width={120} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Todas las respuestas</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{respuestas.length}</Badge> respuestas únicas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar…"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                className="w-48"
              />
              <Button variant="destructive" onClick={onBorrar}>
                Borrar todo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead className="w-12 text-right">#</TableHead>
                {COLUMNAS.map(({ clave, titulo }) => {
                  const Icono = orden.clave !== clave ? ArrowUpDown : orden.direccion === 'asc' ? ArrowUp : ArrowDown
                  return (
                    <TableHead key={clave}>
                      <button
                        type="button"
                        onClick={() => cambiarOrden(clave)}
                        className="flex items-center gap-1 font-medium hover:text-foreground"
                      >
                        {titulo}
                        <Icono className="size-3.5 opacity-60" />
                      </button>
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filas.map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell className="text-right text-muted-foreground">{fila.numero}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{fila.categoriaNombre}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{fila.disfraz}</TableCell>
                  <TableCell>{fila.persona}</TableCell>
                  <TableCell className="max-w-xs whitespace-normal">{fila.feedback || '—'}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(fila.fecha).toLocaleString('es-MX')}
                  </TableCell>
                </TableRow>
              ))}
              {filas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Sin resultados para “{busqueda}”.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PanelRespuestas
