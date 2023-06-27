interface WavesOptions {
  resize: boolean
  rotation: number
  waves: number
  width: number
  hue: [number, number]
  amplitude: number
  background: boolean
  preload: boolean
  speed: [number, number]
  debug: boolean
  fps: boolean
}

interface WaveLine {
  angle: number[]
  color: string
}

interface Wave {
  // eslint-disable-next-line no-use-before-define
  Waves: Waves
  Lines: WaveLine[]
  angle: number[]
  speed: number[]
}

interface Stats {
  data: number[]
  last?: number
  new?: number
  delta?: number
}

export default class Waves {
  public options: WavesOptions
  private waves: Wave[]
  private holder: HTMLElement
  private canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  private hue: number
  private hueFw: boolean
  private stats: Stats
  private scale!: number
  private width!: number
  private height!: number
  public radius!: number
  public centerX!: number
  public centerY!: number
  public color!: string

  constructor (holder: string, options: Partial<WavesOptions>) {
    this.options = {
      resize: false,
      rotation: 45,
      waves: 5,
      width: 100,
      hue: [11, 14],
      amplitude: 0.5,
      background: true,
      preload: true,
      speed: [0.004, 0.008],
      debug: false,
      fps: false,
      ...options
    }

    this.waves = []

    this.holder = document.querySelector(holder) as HTMLElement
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    this.holder.appendChild(this.canvas)

    this.hue = this.options.hue ? this.options.hue[0] : 11
    this.hueFw = true
    this.stats = new Stats()

    this.resize()
    this.init(this.options.preload || true)

    if (this.options.resize) {
      window.addEventListener('resize', () => {
        this.resize()
      })
    }
  }

  private init (preload: boolean): void {
    const options = this.options

    for (let i = 0; i < (options.waves || 5); i++) {
      this.waves[i] = new Wave(this)
    }

    if (preload) {
      this.preload()
    }
  }

  private preload (): void {
    const options = this.options

    for (let i = 0; i < (options.waves || 5); i++) {
      this.updateColor()
      for (let j = 0; j < (options.width || 84); j++) {
        this.waves[i].update()
      }
    }
  }

  public render (): void {
    const ctx = this.ctx

    this.updateColor()
    this.clear()

    if (this.options.debug) {
      ctx.beginPath()
      ctx.strokeStyle = '#f00'
      ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    if (this.options.background) {
      this.background()
    }

    each(this.waves, (wave) => {
      wave.update()
      wave.draw()
    })
  }

  public animate (): void {
    this.render()

    if (this.options.fps) {
      this.stats.log()
      this.ctx.font = '12px Arial'
      this.ctx.fillStyle = '#fff'
      this.ctx.fillText(`${this.stats.fps()} FPS`, 10, 22)
    }

    window.requestAnimationFrame(this.animate.bind(this))
  }

  private clear (): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  private background (): void {
    const ctx = this.ctx

    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
    gradient.addColorStop(0, '#FFF5DA')
    gradient.addColorStop(1, this.color)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.width, this.height)
  }

  private resize (): void {
    const width = this.holder.offsetWidth
    const height = this.holder.offsetHeight
    this.scale = window.devicePixelRatio || 1
    this.width = width * this.scale
    this.height = height * this.scale
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2
    this.centerX = this.width / 2
    this.centerY = this.height / 2
    // this.radius /= 2; // REMOVE FOR FULLSCREEN
  }

  private updateColor (): void {
    this.hue += this.hueFw ? 0.01 : -0.01

    if (this.hue > this.options.hue[1] && this.hueFw) {
      this.hue = this.options.hue[1]
      this.hueFw = false
    } else if (this.hue < this.options.hue[0] && !this.hueFw) {
      this.hue = this.options.hue[0]
      this.hueFw = true
    }

    const a = Math.floor(127 * Math.sin(0.3 * this.hue + 0) + 128)
    const b = Math.floor(127 * Math.sin(0.3 * this.hue + 2) + 128)
    const c = Math.floor(127 * Math.sin(0.3 * this.hue + 4) + 128)

    this.color = `rgba(${a},${b},${c}, 0.07)`
  }
}

class Line {
  public angle: number[]
  public color: string

  constructor (Wave: Wave, color: string) {
    const angle = Wave.angle
    const speed = Wave.speed

    this.angle = [
      Math.sin((angle[0] += speed[0])),
      Math.sin((angle[1] += speed[1])),
      Math.sin((angle[2] += speed[2])),
      Math.sin((angle[3] += speed[3]))
    ]

    this.color = color
  }
}

class Wave {
  public Waves: Waves
  public Lines: Line[]
  public angle: number[]
  public speed: number[]

  constructor (Waves: Waves) {
    const speed = Waves.options.speed

    this.Waves = Waves
    this.Lines = []

    this.angle = [rnd(Math.PI * 2), rnd(Math.PI * 2), rnd(Math.PI * 2), rnd(Math.PI * 2)]

    this.speed = [
      rnd(speed[0], speed[1]) * rndSign(),
      rnd(speed[0], speed[1]) * rndSign(),
      rnd(speed[0], speed[1]) * rndSign(),
      rnd(speed[0], speed[1]) * rndSign()
    ]
  }

  public update (): void {
    const Lines = this.Lines
    const color = this.Waves.color

    Lines.push(new Line(this, color))

    if (Lines.length > this.Waves.options.width) {
      Lines.shift()
    }
  }

  public draw (): void {
    const Waves = this.Waves

    const ctx = Waves.ctx
    const radius = Waves.radius
    const radius3 = radius / 3
    const x = Waves.centerX
    const y = Waves.centerY
    const rotation = dtr(Waves.options.rotation)
    const amplitude = Waves.options.amplitude
    const debug = Waves.options.debug

    const Lines = this.Lines

    each(Lines, (line, i) => {
      if (debug && i > 0) {
        return
      }

      const angle = line.angle

      const x1 = x - radius * Math.cos(angle[0] * amplitude + rotation)
      const y1 = y - radius * Math.sin(angle[0] * amplitude + rotation)
      const x2 = x + radius * Math.cos(angle[3] * amplitude + rotation)
      const y2 = y + radius * Math.sin(angle[3] * amplitude + rotation)
      const cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2)
      const cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2)
      const cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2)
      const cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2)

      ctx.strokeStyle = debug ? '#fff' : line.color

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2)
      ctx.stroke()

      if (debug) {
        ctx.strokeStyle = '#fff'
        ctx.globalAlpha = 0.3

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(cpx1, cpy1)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x2, y2)
        ctx.lineTo(cpx2, cpy2)
        ctx.stroke()

        ctx.globalAlpha = 1
      }
    })
  }
}
class Stats {
  public data: number[]

  constructor () {
    this.data = []
  }

  private time (): number {
    return (performance || Date).now()
  }

  public log (): number | void {
    if (!this.last) {
      this.last = this.time()
      return 0
    }

    this.new = this.time()
    this.delta = this.new - this.last
    this.last = this.new

    this.data.push(this.delta)
    if (this.data.length > 10) {
      this.data.shift()
    }
  }

  public fps (): number {
    let fps = 0
    each(this.data, (data) => {
      fps += data
    })

    return Math.round(1000 / (fps / this.data.length))
  }
}

function each (items: any[], callback: (item: any, index: number) => void): void {
  for (let i = 0; i < items.length; i++) {
    callback(items[i], i)
  }
}

// function extend (options: any, defaults: any): any {
//   for (const key in options) {
//     if (defaults.hasOwnProperty(key)) {
//       defaults[key] = options[key]
//     }
//   }
//   return defaults
// }

function dtr (deg: number): number {
  return (deg * Math.PI) / 180
}

// function rtd (rad: number): number {
//   return (rad * 180) / Math.PI
// }

// function diagonal_angle (w: number, h: number): number {
//   const a = Math.atan(h / w)
//   return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) * Math.sin(a)
// }

function rnd (min: number, max?: number): number {
  if (max == null) {
    max = min
    min = 0
  }
  return Math.random() * (max - min) + min
}

function rndSign (): number {
  return Math.random() > 0.5 ? 1 : -1
}
