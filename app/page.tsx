"use client"

import React, { useState, useEffect } from "react";
import { AlunoModel } from "./alunos/aluno.model";
import AlunoController from "./alunos/aluno.controller";
import AlunoView from "./alunos/aluno.view";
import { FilterComponent } from "@/components/ui/filter";
import alunoController from "./alunos/aluno.controller";

const AlunosPage: React.FC = ({ searchParams }: any) => {
  const [alunos, setAlunos] = useState<AlunoModel[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<AlunoModel | null>(null);
  const [nomeFiltro, setNomeFiltro] = useState<string>("");
  const [cursos, setCursos] = useState<string[]>([])
  const [modalidades, setModalidades] = useState<string[]>([])

  // Função para carregar a lista de alunos
  const carregarAlunos = async () => {
    try {
      const lista = await AlunoController.listarAlunos(nomeFiltro, searchParams.curso ?? "", searchParams.modalidade ?? "");
      setAlunos(lista);
      const todosOsAlunos = await AlunoController.listarAlunos("", "", "");
      const cursos = todosOsAlunos.map((aluno) => aluno.curso);
      const modalidades = todosOsAlunos.map((aluno) => aluno.modalidade);
      setCursos(Array.from(new Set(cursos)));
      setModalidades(Array.from(new Set(modalidades)));
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, [searchParams.curso, searchParams.modalidade, nomeFiltro])

  return (
    <main className="max-w-[1200px] w-full flex flex-col">
      <h1>Consulta de Alunos</h1>

      <FilterComponent filters={[
        {
          name: "modalidade",
          title: "Modalidade",
          values: [...modalidades.map(c => {
            return {
              value: c,
              label: c
            }
          })]
        },
        {
          name: "curso",
          title: "Curso",
          values: [...cursos.map(c => {
            return {
              value: c,
              label: c
            }
          })]
        }
      ]}/>

      {/* Renderizar o filtro */}
      {AlunoView.renderFiltro(nomeFiltro, setNomeFiltro, carregarAlunos)}
      
      {/* Renderizar a lista */}
      {AlunoView.renderLista(alunos)}

      {/* Renderizar os detalhes */}
    </main>
  );
};

export default AlunosPage;
