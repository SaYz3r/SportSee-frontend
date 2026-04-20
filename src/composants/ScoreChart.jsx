import { useEffect, useRef } from "react"
import * as d3 from "d3"
import "../styles/ScoreChart.css"

/**
 * ScoreChart — Arc de cercle affichant le score du jour
 * Utilise d3.arc() de d3-shape
 * @param {number} score - score entre 0 et 1 (ex: 0.12)
 */
function ScoreChart({ score }) {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current) return

        // Dimensions du SVG
        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight
        // Centre du cercle
        const cx = width / 2
        const cy = height / 2
        // Rayon calculé depuis la taille du SVG
        const radius = Math.min(width, height) / 2 - 10

        // Nettoyage avant redraw
        d3.select(svgRef.current).selectAll("*").remove()

        
        const svg = d3.select(svgRef.current)

        // Créer le rond a l'intérieur ou serra écrit l'objectif
        svg.append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", radius - 11)
            .attr("fill", "white")

        /*** Créer l'arc complet pour objectif complet a 100%
        const backgroundArc = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI)
            .cornerRadius(10) 

        svg.append("path")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("d", backgroundArc)
            .attr("fill", "#black") */

        // Créer l'arc selon l'objectif atteind
        const scoreArc = d3.arc()
            .innerRadius(radius - 10)  // rayon intérieur
            .outerRadius(radius)  // rayon extérieur — différence = épaisseur de l'arc
            .startAngle(0)  // démarre à 12h
            .endAngle(-(score * 2 * Math.PI))  // fin selon le score
            .cornerRadius(10)  // extrémités arrondies

        svg.append("path")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("d", scoreArc)
            .attr("fill", "#FF0000")

        // Récupère le score // 0.12 // et fait un X100 dessus pour avoir le pourcentage
        const scorePercent = Math.round(score * 100)

        // Positionne le score et l'affiche
        svg.append("text")
            .attr("x", cx)
            .attr("y", cy - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "26px")
            .attr("font-weight", "700")
            .attr("fill", "#20253A")
            .text(`${scorePercent}%`)

        // Positionne le "de votre" et l'affiche
        svg.append("text")
            .attr("x", cx)
            .attr("y", cy + 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("fill", "#74798C")
            .text("de votre")

        // Positionne le "objectif" et l'affiche
        svg.append("text")
            .attr("x", cx)
            .attr("y", cy + 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("fill", "#74798C")
            .text("objectif")

    }, [score])

    return (
        <div className="score-wrapper">
            {/* Titre en haut à gauche */}
            <p className="score-title">Score</p>
            {/* SVG prend toute la place du wrapper */}
            <svg ref={svgRef} width="100%" height="100%" />
        </div>
    )
}

export default ScoreChart