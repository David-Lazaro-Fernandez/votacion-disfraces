import { useState } from 'react'
import Decoracion from '@/components/Decoracion'
import FormularioRespuesta from '@/components/FormularioRespuesta'
import PanelRespuestas from '@/components/PanelRespuestas'
import RevelarGanador from '@/components/RevelarGanador'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  borrarRespuestas,
  cargarGanador,
  cargarRespuestas,
  guardarGanador,
  guardarRespuesta,
} from '@/lib/respuestas'

function App() {
  const [respuestas, setRespuestas] = useState(cargarRespuestas)
  const [ganador, setGanador] = useState(cargarGanador)

  function handleEnviar(respuesta) {
    setRespuestas(guardarRespuesta(respuesta))
  }

  function handleBorrarRespuestas() {
    if (!window.confirm('¿Borrar todas las respuestas de este dispositivo?')) return
    borrarRespuestas()
    setRespuestas([])
  }

  function handleGuardarGanador(datos) {
    guardarGanador(datos)
    setGanador(datos)
  }

  function handleCambiarGanador() {
    if (!window.confirm('¿Cambiar el ganador guardado?')) return
    guardarGanador(null)
    setGanador(null)
  }

  return (
    <>
      <Decoracion />
      <main className="relative z-10 mx-auto max-w-5xl space-y-6 px-4 py-8">
        <header className="space-y-2 text-center">
          <p className="animate-bob text-5xl" aria-hidden="true">🎃</p>
          <h1 className="font-spooky animate-flicker text-6xl text-primary sm:text-7xl">
            Concurso de disfraces
          </h1>
          <p className="text-muted-foreground">Halloween · ¿Quién dará más miedo? 👻</p>
        </header>

        <Tabs defaultValue="responder" className="space-y-6">
          <TabsList className="mx-auto">
            <TabsTrigger value="responder">Responder</TabsTrigger>
            <TabsTrigger value="panel">Panel ({respuestas.length})</TabsTrigger>
            <TabsTrigger value="ganador">Ganador</TabsTrigger>
          </TabsList>

          <TabsContent value="responder" className="mx-auto max-w-lg">
            <FormularioRespuesta onEnviar={handleEnviar} />
          </TabsContent>

          <TabsContent value="panel">
            <PanelRespuestas respuestas={respuestas} onBorrar={handleBorrarRespuestas} />
          </TabsContent>

          <TabsContent value="ganador">
            <RevelarGanador
              ganador={ganador}
              onGuardar={handleGuardarGanador}
              onCambiar={handleCambiarGanador}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default App
