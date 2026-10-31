const murcielagos = [
  { top: '8%', duracion: '22s', retraso: '0s', tamano: 'text-3xl' },
  { top: '30%', duracion: '28s', retraso: '-9s', tamano: 'text-2xl' },
  { top: '62%', duracion: '34s', retraso: '-18s', tamano: 'text-4xl' },
]

const arañas = [
  { left: '6%', largo: '8rem', retraso: '0s' },
  { left: '26%', largo: '5rem', retraso: '-1.2s' },
  { left: '74%', largo: '11rem', retraso: '-2.5s' },
  { left: '93%', largo: '6rem', retraso: '-0.6s' },
]

const fantasmas = [
  { left: '12%', top: '45%', retraso: '0s' },
  { left: '84%', top: '18%', retraso: '-2s' },
  { left: '50%', top: '78%', retraso: '-4s' },
]

function Decoracion() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-24 right-[-4rem] size-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -top-8 right-8 size-24 rounded-full bg-[oklch(0.97_0.03_90)] opacity-80 shadow-[0_0_60px_10px_oklch(0.95_0.05_90/0.35)]" />

      <div className="animate-fog absolute -bottom-10 left-[-20%] h-64 w-[140%] rounded-[50%] bg-witch/25 blur-3xl" />
      <div
        className="animate-fog absolute bottom-0 left-[-30%] h-48 w-[160%] rounded-[50%] bg-primary/10 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />

      {murcielagos.map((murcielago, indice) => (
        <span
          key={indice}
          className={`animate-fly absolute left-0 ${murcielago.tamano} opacity-70`}
          style={{ top: murcielago.top, animationDuration: murcielago.duracion, animationDelay: murcielago.retraso }}
        >
          🦇
        </span>
      ))}

      {arañas.map((araña, indice) => (
        <div
          key={indice}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: araña.left }}
        >
          <div className="w-px bg-foreground/40" style={{ height: araña.largo }} />
          <span
            className="animate-sway text-2xl"
            style={{ animationDelay: araña.retraso }}
          >
            🕷️
          </span>
        </div>
      ))}

      {fantasmas.map((fantasma, indice) => (
        <span
          key={indice}
          className="animate-float absolute text-5xl opacity-40"
          style={{ left: fantasma.left, top: fantasma.top, animationDelay: fantasma.retraso }}
        >
          👻
        </span>
      ))}
    </div>
  )
}

export default Decoracion
