import { useEffect, useRef } from "react"
import * as d3 from "d3"
import "../styles/SessionsChart.css"

const DAYS = ["L", "M", "M", "J", "V", "S", "D"]

function SessionsChart({ sessions }) {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current || !sessions || !sessions.length) return

        const draw = () => {
            if (!svgRef.current) return

            const width = svgRef.current.clientWidth
            const height = svgRef.current.clientHeight
            if (width === 0 || height === 0) return

            const margin = { top: 40, right: 0, bottom: 40, left: 0 }
            const innerWidth = width - margin.left - margin.right
            const innerHeight = height - margin.top - margin.bottom

            d3.select(svgRef.current).selectAll("*").remove()

            const svg = d3.select(svgRef.current)
            const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)

            // Définit une zone de découpe pour la courbe
            svg.append("defs")
                .append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height)

            // Une seule scale X pour tout
            const x = d3.scalePoint()
                .domain(sessions.map((s) => s.day))
                .range([0, innerWidth])
                .padding(0.3)

            // Scale Y — durée en minutes
            const y = d3.scaleLinear()
                .domain([
                    d3.min(sessions, (s) => s.sessionLength) - 20,
                    d3.max(sessions, (s) => s.sessionLength) + 20,
                ])
                .range([innerHeight, 0])

            // Générateur de la zone remplie sous la courbe
            const area = d3.area()
                .x((d) => x(d.day))
                .y0(innerHeight)
                .y1((d) => y(d.sessionLength))
                .curve(d3.curveMonotoneX)

            // Générateur de la ligne de la courbe
            const line = d3.line()
                .x((d) => x(d.day))
                .y((d) => y(d.sessionLength))
                .curve(d3.curveMonotoneX)

            // Zone remplie avec clipPath
            g.append("g")
                .attr("clip-path", "url(#clip)")
                .append("path")
                .datum(sessions)
                .attr("d", area)
                .attr("fill", "rgba(255,255,255,0.2)")

            // Ligne avec clipPath
            g.append("g")
                .attr("clip-path", "url(#clip)")
                .append("path")
                .datum(sessions)
                .attr("d", line)
                .attr("fill", "none")
                .attr("stroke", "rgba(255,255,255,0.6)")
                .attr("stroke-width", 2)

            // Labels des jours en bas
            g.append("g")
                .attr("transform", `translate(0, ${innerHeight + 20})`)
                .selectAll("text")
                .data(sessions)
                .enter()
                .append("text")
                .attr("x", (d) => x(d.day))
                .attr("text-anchor", "middle")
                .attr("fill", "rgba(255,255,255,0.6)")
                .attr("font-size", "12px")
                .text((_, i) => DAYS[i])

            // Tooltip HTML
            const tooltip = d3.select(".sessions-wrapper")
                .append("div")
                .attr("class", "sessions-tooltip")
                .style("opacity", 0)

            // Point blanc sur la courbe au survol
            const dot = g.append("circle")
                .attr("r", 4)
                .attr("fill", "white")
                .style("opacity", 0)

            // Zone de survol dans le groupe g
            g.append("rect")
                .attr("width", innerWidth)
                .attr("height", innerHeight)
                .attr("fill", "transparent")
                .on("mousemove", (event) => {
                    // Coordonnées relatives au groupe g
                    const [mouseX] = d3.pointer(event)
                    const domain = sessions.map((s) => s.day)

                    // Trouve le jour le plus proche
                    const closest = domain.reduce((a, b) =>
                        Math.abs(x(a) - mouseX) < Math.abs(x(b) - mouseX) ? a : b
                    )
                    const d = sessions.find((s) => s.day === closest)

                    // Affiche le tooltip
                    tooltip
                        .style("opacity", 1)
                        .html(`<p>${d.sessionLength} min</p>`)

                    const wrapper = document.querySelector(".sessions-wrapper")
                    const rect = wrapper.getBoundingClientRect()
                    const tooltipX = event.clientX - rect.left + 10
                    const tooltipWidth = 60

                    // Si le tooltip dépasse à droite on le place à gauche
                    const left = tooltipX + tooltipWidth > rect.width
                        ? event.clientX - rect.left - tooltipWidth - 10
                        : tooltipX

                    tooltip
                        .style("left", `${left}px`)
                        .style("top", `${event.clientY - rect.top - 40}px`)

                    // Affiche le point blanc sur la courbe
                    dot
                        .style("opacity", 1)
                        .attr("cx", x(d.day))
                        .attr("cy", y(d.sessionLength))
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0)
                    dot.style("opacity", 0)
                })
        }

        draw()

        // Redessine si la taille change
        const observer = new ResizeObserver(draw)
        observer.observe(svgRef.current)

        return () => observer.disconnect()

    }, [sessions])

    return (
        <div className="sessions-wrapper">
            <p className="sessions-title">Durée moyenne des sessions</p>
            <svg ref={svgRef} width="100%" height="100%" />
        </div>
    )
}

export default SessionsChart