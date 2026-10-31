import { useState } from 'react'
import confetti from 'canvas-confetti'
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

const VACIO = { categoria: '', disfraz: '', persona: '' }

const COLORES_HALLOWEEN = ['#ff7a18', '#7c3aed', '#84f54a', '#ffffff', '#1f1033']

function lanzarConfeti() {
  const duracion = 3000
  const final = Date.now() + duracion

  const rafaga = () => {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: COLORES_HALLOWEEN })
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: COLORES_HALLOWEEN })
    if (Date.now() < final) requestAnimationFrame(rafaga)
  }

  confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 }, colors: COLORES_HALLOWEEN })
  rafaga()
}

function RevelarGanador({ ganador, onGuardar, onCambiar }) {
  const [campos, setCampos] = useState(VACIO)
  const [revelado, setRevelado] = useState(false)

  const completo = campos.categoria.trim() && campos.disfraz.trim() && campos.persona.trim()

  function actualizar(campo) {
    return (evento) => setCampos((actual) => ({ ...actual, [campo]: evento.target.value }))
  }

  function handleGuardar(evento) {
    evento.preventDefault()
    if (!completo) return
    onGuardar({
      categoria: campos.categoria.trim(),
      disfraz: campos.disfraz.trim(),
      persona: campos.persona.trim(),
    })
    setCampos(VACIO)
    setRevelado(false)
  }

  function handleRevelar() {
    setRevelado(true)
    lanzarConfeti()
  }

  if (!ganador) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Registrar ganador</CardTitle>
          <CardDescription>Escribe el resultado del conteo. Después podrás revelarlo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGuardar} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Input
                id="categoria"
                placeholder="Ej. Mejor disfraz en pareja"
                value={campos.categoria}
                onChange={actualizar('categoria')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disfraz-ganador">Disfraz</Label>
              <Input
                id="disfraz-ganador"
                value={campos.disfraz}
                onChange={actualizar('disfraz')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="persona-ganador">Persona</Label>
              <Input
                id="persona-ganador"
                value={campos.persona}
                onChange={actualizar('persona')}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!completo}>
              Guardar ganador
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (!revelado) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <p className="animate-float text-6xl" aria-hidden="true">👻</p>
        <p className="text-muted-foreground">Ganador listo para revelar.</p>
        <Button size="lg" className="animate-glow px-10 py-6 text-lg" onClick={handleRevelar}>
          🎃 Revelar ganador
        </Button>
        <Button variant="link" onClick={onCambiar}>
          Cambiar ganador
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <Card className="animate-rise w-full max-w-lg">
        <CardHeader>
          <CardDescription className="text-base">{ganador.categoria}</CardDescription>
          <CardTitle className="text-4xl">{ganador.disfraz}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{ganador.persona}</p>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button onClick={handleRevelar}>Otra vez 🎉</Button>
        <Button variant="outline" onClick={onCambiar}>
          Cambiar ganador
        </Button>
      </div>
    </div>
  )
}

export default RevelarGanador
