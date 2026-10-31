import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { categorias } from '@/data/categorias'

const VACIO = { categoria: '', disfraz: '', persona: '', feedback: '' }

function FormularioRespuesta({ onEnviar }) {
  const [campos, setCampos] = useState(VACIO)
  const [enviado, setEnviado] = useState(false)

  const completo = campos.categoria && campos.disfraz.trim() && campos.persona.trim()

  function actualizar(campo) {
    return (evento) => setCampos((actual) => ({ ...actual, [campo]: evento.target.value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    if (!completo) return

    onEnviar({
      categoria: campos.categoria,
      disfraz: campos.disfraz.trim(),
      persona: campos.persona.trim(),
      feedback: campos.feedback.trim(),
    })
    setCampos(VACIO)
    setEnviado(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {enviado && (
        <Alert className="animate-rise">
          <AlertTitle>¡Respuesta registrada! 🦇</AlertTitle>
          <AlertDescription>Gracias. Puedes enviar otra si quieres.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tu disfraz</CardTitle>
          <CardDescription>Elige la categoría y cuéntanos quién eres y cómo te disfrazaste.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select
                value={campos.categoria}
                onValueChange={(valor) => setCampos((actual) => ({ ...actual, categoria: valor }))}
              >
                <SelectTrigger id="categoria" className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disfraz">Nombre del disfraz</Label>
              <Input
                id="disfraz"
                placeholder="Ej. Billy Bass, Mario, Wednesday…"
                value={campos.disfraz}
                onChange={actualizar('disfraz')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persona">Nombre de la persona</Label>
              <Input
                id="persona"
                placeholder="Tu nombre o el de quien lo usa"
                value={campos.persona}
                onChange={actualizar('persona')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback para la fiesta</Label>
              <Textarea
                id="feedback"
                placeholder="¿Qué te gustó? ¿Qué cambiarías para la próxima?"
                value={campos.feedback}
                onChange={actualizar('feedback')}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className={`w-full ${completo ? 'animate-glow' : ''}`}
              disabled={!completo}
            >
              Enviar respuesta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormularioRespuesta
