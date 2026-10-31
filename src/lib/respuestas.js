const CLAVE_RESPUESTAS = 'respuestas-disfraces'
const CLAVE_GANADOR = 'ganador-disfraces'

// Las respuestas se guardan en el navegador de cada dispositivo.
export function cargarRespuestas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RESPUESTAS)) ?? []
  } catch {
    return []
  }
}

export function guardarRespuesta(respuesta) {
  const nueva = {
    ...respuesta,
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
  }
  const respuestas = [...cargarRespuestas(), nueva]
  localStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify(respuestas))
  return respuestas
}

export function borrarRespuestas() {
  localStorage.removeItem(CLAVE_RESPUESTAS)
}

export function cargarGanador() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_GANADOR))
  } catch {
    return null
  }
}

export function guardarGanador(ganador) {
  localStorage.setItem(CLAVE_GANADOR, JSON.stringify(ganador))
}

// Agrupa por nombre de disfraz ignorando mayúsculas y espacios de más.
export function conteoPorDisfraz(respuestas) {
  const conteo = new Map()
  for (const { disfraz } of respuestas) {
    const clave = disfraz.trim().toLowerCase()
    const actual = conteo.get(clave) ?? { nombre: disfraz.trim(), total: 0 }
    conteo.set(clave, { ...actual, total: actual.total + 1 })
  }
  return [...conteo.values()].sort((a, b) => b.total - a.total)
}
