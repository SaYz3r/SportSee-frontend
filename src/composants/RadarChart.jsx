import { useEffect, useRef } from "react"
import * as d3 from "d3"
import "../styles/RadarChart.css"

function RadarChart({ data }) {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current || !data || !data.length) return

        const draw = () => {
            if (!svgRef.current) return

            const width = svgRef.current.clientWidth
            const height = svgRef.current.clientHeight
            if (width === 0 || height === 0) return

            // Centre du graphique
            const cx = width / 2
            const cy = height / 2

            // Taille du radar
            const radius = Math.min(width, height) / 2 - 35

            // Nombre de côtés (6 = hexagone)
            const total = data.length

            // Nettoie le SVG avant de redessiner
            d3.select(svgRef.current).selectAll("*").remove()

            const svg = d3.select(svgRef.current)
            const g = svg.append("g").attr("transform", `translate(${cx}, ${cy})`)

            // Convertit une valeur en pixels
            const rScale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .range([0, radius])

            // Angle entre chaque axe
            const angleSlice = (2 * Math.PI) / total

            // Dessine 5 hexagones de grille
            const levels = 5
            for (let level = 1; level <= levels; level++) {
                const r = (radius / levels) * level

                // Calcule les 6 points de l'hexagone
                const points = data.map((_, i) => {
                    const angle = angleSlice * i - Math.PI / 2
                    return [r * Math.cos(angle), r * Math.sin(angle)]
                })

                g.append("polygon")
                    .attr("points", points.map((p) => p.join(",")).join(" "))
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
            }

            // Calcule les points de la zone rouge selon les valeurs
            const performancePoints = data.map((d, i) => {
                const angle = angleSlice * i - Math.PI / 2
                const r = rScale(d.value)
                return [r * Math.cos(angle), r * Math.sin(angle)]
            })

            // Dessine la zone rouge des performances
            g.append("polygon")
                .attr("points", performancePoints.map((p) => p.join(",")).join(" "))
                .attr("fill", "#FF0000")
                .attr("fill-opacity", 0.7)
                .attr("stroke", "#FF0000")
                .attr("stroke-width", 1)

            // Dessine les labels autour du radar
            data.forEach((d, i) => {
                const angle = angleSlice * i - Math.PI / 2
                const labelRadius = radius + 20
                const x = labelRadius * Math.cos(angle)
                const y = labelRadius * Math.sin(angle)

                g.append("text")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("fill", "white")
                    .attr("font-size", "12px")
                    .attr("font-weight", "500")
                    .text(d.kind)
            })
        }

        draw()

        // Redessine si la taille change
        const observer = new ResizeObserver(draw)
        observer.observe(svgRef.current)

        return () => observer.disconnect()

    }, [data])

    return (
        <div className="radar-wrapper">
            <svg ref={svgRef} width="100%" height="100%" />
        </div>
    )
}

export default RadarChart