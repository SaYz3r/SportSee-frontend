import { useEffect, useRef } from "react"
import * as d3 from "d3"
import "../styles/ActivityChart.css"

function ActivityChart({ sessions }) {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current || !sessions || !sessions.length) return

        const draw = () => {
            if (!svgRef.current) return

            const totalWidth = svgRef.current.clientWidth
            const totalHeight = svgRef.current.clientHeight
            if (totalWidth === 0 || totalHeight === 0) return

            const margin = { top: 80, right: 90, bottom: 50, left: 10 }
            const width = totalWidth - margin.left - margin.right
            const height = totalHeight - margin.top - margin.bottom

            d3.select(svgRef.current).selectAll("*").remove()

            const svg = d3.select(svgRef.current)
            const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)

            // Scale X — une bande par jour
            const x = d3.scaleBand()
                .domain(sessions.map((s) => s.day))
                .range([0, width])
                .padding(0.5)

            // Scale Y pour le poids (axe droite)
            const yKg = d3.scaleLinear()
                .domain([
                    d3.min(sessions, (s) => s.kilogram) - 2,
                    d3.max(sessions, (s) => s.kilogram) + 2,
                ])
                .range([height, 0])

            // Scale Y pour les calories (cachée)
            const yCal = d3.scaleLinear()
                .domain([0, d3.max(sessions, (s) => s.calories) + 50])
                .range([height, 0])

            // Grille horizontale
            g.append("g")
                .call(d3.axisLeft(yKg).tickSize(-width).tickFormat("").ticks(3))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g.selectAll(".tick line")
                        .attr("stroke", "#DEDEDE")
                        .attr("stroke-dasharray", "2,2")
                )

            // Axe X
            g.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g.selectAll("text")
                        .attr("fill", "#9B9EAC")
                        .attr("font-size", "14px")
                        .attr("dy", "2em")
                )

            // Axe Y droite (kg)
            g.append("g")
                .attr("transform", `translate(${width + 20}, 0)`)
                .call(d3.axisRight(yKg).ticks(3).tickSize(0))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g.selectAll("text")
                        .attr("fill", "#9B9EAC")
                        .attr("font-size", "14px")
                        .attr("dx", "1em")
                )

            // Zones grises de fond — dessinées AVANT les barres
            const bgRects = g.selectAll(".bg-rect")
                .data(sessions)
                .enter()
                .append("rect")
                .attr("class", "bg-rect")
                .attr("x", (d) => x(d.day) - x.step() * 0.1)
                .attr("y", 0)
                .attr("width", x.step() * 0.8)
                .attr("height", height)
                .attr("fill", "transparent")

            const barWidth = 7
            const groupWidth = barWidth * 2 + 4
            const groupOffset = (x.bandwidth() - groupWidth) / 2

            // Barres kilogram — arrondies en haut seulement
            g.selectAll(".bar-kg")
                .data(sessions)
                .enter()
                .append("path")
                .attr("class", "bar-kg")
                .attr("fill", "#282D30")
                .attr("d", (d) => {
                    const x_ = x(d.day) + groupOffset
                    const y_ = yKg(d.kilogram)
                    const w = barWidth
                    const h = height - yKg(d.kilogram)
                    const r = 3
                    return `M${x_},${y_ + h} L${x_},${y_ + r} Q${x_},${y_} ${x_ + r},${y_} L${x_ + w - r},${y_} Q${x_ + w},${y_} ${x_ + w},${y_ + r} L${x_ + w},${y_ + h} Z`
                })

            // Barres calories — arrondies en haut seulement
            g.selectAll(".bar-cal")
                .data(sessions)
                .enter()
                .append("path")
                .attr("class", "bar-cal")
                .attr("fill", "#E60000")
                .attr("d", (d) => {
                    const x_ = x(d.day) + groupOffset + barWidth + 4
                    const y_ = yCal(d.calories)
                    const w = barWidth
                    const h = height - yCal(d.calories)
                    const r = 3
                    return `M${x_},${y_ + h} L${x_},${y_ + r} Q${x_},${y_} ${x_ + r},${y_} L${x_ + w - r},${y_} Q${x_ + w},${y_} ${x_ + w},${y_ + r} L${x_ + w},${y_ + h} Z`
                })

            // Tooltip
            d3.select(".activity-tooltip").remove()
            const tooltip = d3.select(".activity-chart-wrapper")
                .append("div")
                .attr("class", "activity-tooltip")
                .style("opacity", 0)

            // Overlays invisibles — APRÈS les barres pour capturer les événements
            g.selectAll(".overlay")
                .data(sessions)
                .enter()
                .append("rect")
                .attr("class", "overlay")
                .attr("x", (d) => x(d.day) - x.step() * 0.1)
                .attr("y", 0)
                .attr("width", x.step() * 0.8)
                .attr("height", height)
                .attr("fill", "transparent")
                .on("mouseover", (event, d) => {
                    // Colorie uniquement la zone grise correspondante
                    bgRects.filter((s) => s.day === d.day)
                        .attr("fill", "rgba(196,196,196,0.5)")
                    tooltip
                        .style("opacity", 1)
                        .html(`<p>${d.kilogram}kg</p><p>${d.calories}Kcal</p>`)
                })
                .on("mousemove", (event) => {
                    const wrapper = document.querySelector(".activity-chart-wrapper")
                    const rect = wrapper.getBoundingClientRect()
                    tooltip
                        .style("left", `${event.clientX - rect.left + 20}px`)
                        .style("top", `${event.clientY - rect.top - 40}px`)
                })
                .on("mouseout", (event, d) => {
                    // Remet la zone grise transparente
                    bgRects.filter((s) => s.day === d.day)
                        .attr("fill", "transparent")
                    tooltip.style("opacity", 0)
                })

            // Légende
            const legendData = [
                { label: "Poids (kg)", color: "#282D30" },
                { label: "Calories brûlées (kCal)", color: "#E60000" },
            ]

            const legendG = d3.select(svgRef.current)
                .append("g")
                .attr("transform", `translate(0, 30)`)

            const legendItemWidth = 170
            legendData.forEach((item, i) => {
                const xPos = totalWidth - (legendData.length - i) * legendItemWidth
                const g = legendG.append("g").attr("transform", `translate(${xPos}, 0)`)
                g.append("circle").attr("r", 5).attr("fill", item.color)
                g.append("text")
                    .attr("x", 12)
                    .attr("y", 5)
                    .attr("fill", "#74798C")
                    .attr("font-size", "14px")
                    .text(item.label)
            })
        }

        draw()

        const observer = new ResizeObserver(draw)
        observer.observe(svgRef.current)

        return () => observer.disconnect()

    }, [sessions])

    return (
        <div className="activity-chart-wrapper">
            <h2 className="activity-title">Activité quotidienne</h2>
            <svg ref={svgRef} width="100%" height="100%" />
        </div>
    )
}

export default ActivityChart