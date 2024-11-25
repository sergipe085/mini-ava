"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import alunoController from "../alunos/aluno.controller"
import matriculaController from "../matriculas/matricula.controller"

const Dashboard = () => {
  const [totalAlunos, setTotalAlunos] = useState(0)
  const [cursosPopulares, setCursosPopulares] = useState([])
  const [modalidades, setModalidades] = useState([])
  const [disciplinasPopulares, setDisciplinasPopulares] = useState([])

  useEffect(() => {
    const carregarDados = async () => {
      const alunos = await alunoController.listarAlunos("", "", "")
      setTotalAlunos(alunos.length)

      const cursos = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1
        return acc
      }, {})
      setCursosPopulares(
        Object.entries(cursos).map(([curso, count]) => ({ curso, alunos: count }))
      )

      const modalidadesContagem = alunos.reduce((acc, aluno) => {
        acc[aluno.modalidade] = (acc[aluno.modalidade] || 0) + 1
        return acc
      }, {})
      setModalidades(
        Object.entries(modalidadesContagem).map(([modalidade, count]) => ({
          modalidade,
          alunos: count,
        }))
      )

      const matriculas = await matriculaController.listarMatriculasPorAluno("")
      const disciplinas = matriculas.reduce((acc, matricula) => {
        acc[matricula.disciplina.nome] = (acc[matricula.disciplina.nome] || 0) + 1
        return acc
      }, {})
      setDisciplinasPopulares(
        Object.entries(disciplinas).map(([disciplina, count]) => ({
          disciplina,
          alunos: count,
        }))
      )
    }

    carregarDados()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalAlunos}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cursos com Mais Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              alunos: {
                label: "Alunos",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={cursosPopulares}>
              <Bar dataKey="alunos" fill="var(--color-alunos)" radius={[4, 4, 0, 0]} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modalidades Mais Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              alunos: {
                label: "Alunos",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <PieChart data={modalidades}>
              <Pie
                dataKey="alunos"
                nameKey="modalidade"
                fill="var(--color-alunos)"
                label={(entry) => entry.modalidade}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disciplinas Mais Cursadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              alunos: {
                label: "Alunos",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={disciplinasPopulares}>
              <Bar dataKey="alunos" fill="var(--color-alunos)" radius={[4, 4, 0, 0]} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

