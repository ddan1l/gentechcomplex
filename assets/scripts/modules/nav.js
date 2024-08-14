const el = document.querySelector('.circled-graph')

const circledGraph = {
    diameter: 72,
    value: 0,
    lastAngle: 0,
    strokeWidth: 4,
    angle: {
        degrees: 0 - Math.PI / 2
    },
    el,
    background: el.querySelector('.circled-graph-canvas'),
    arc: el.querySelector('.circled-graph-arc'),
    text: el.querySelector('.circled-graph-text'),

    setText(value) {
        this.text.innerText = value
    },

    setValue(value) {
        this.value = value
        this.animateGraph()
    },

    describeArc(x, y, radius, startAngle, endAngle) {
        const start = this.polarToCartesian(x, y, radius, endAngle)
        const end = this.polarToCartesian(x, y, radius, startAngle)

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

        return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ")
    },

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        }
    },

    convertDegrees(degrees) {
        return degrees * (Math.PI / 180) - Math.PI / 2
    },

    animateGraph() {
        if (!this.value) {
            return
        }

        const duration = 1000
        const delay = 300
        const degreesTo = this.convertDegrees((this.value * 360) / 100 - 1)

        setTimeout(() => {
            const difference = this.angle.degrees - degreesTo
            const step = difference / duration * 3
            const isPositive = difference > 0

            const interval = setInterval(() => {
                this.angle.degrees -= step

                this.arc.setAttribute('d', this.describeArc(
                    this.diameter / 2,
                    this.diameter / 2,
                    this.diameter / 2 - this.strokeWidth / 2,
                    0,
                    (this.angle.degrees * 180) / Math.PI + 90
                ))
                this.lastAngle = this.angle.degrees


                if ((!isPositive && this.angle.degrees >= degreesTo) || (isPositive && this.angle.degrees <= degreesTo)) {
                    clearInterval(interval)
                }
            }, 0)
        }, delay)
    },

    drawBackground() {
        const canvas = this.background
        const context = canvas.getContext("2d")

        context.arc(
            this.diameter / 2,
            this.diameter / 2,
            this.diameter / 2 - this.strokeWidth / 2,
            this.convertDegrees(0),
            360
        )

        context.strokeStyle = "#FFFFFF26"
        context.imageSmoothingEnabled = false
        context.lineCap = "round"
        context.lineWidth = this.strokeWidth

        context.stroke()
    }
}

const navModule = {circledGraph}

export default navModule
