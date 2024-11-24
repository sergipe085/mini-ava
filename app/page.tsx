"use client"

import React, { useState, useEffect } from "react";
import { AlunoModel } from "./alunos/aluno.model";
import AlunoController from "./alunos/aluno.controller";
import AlunoView from "./alunos/aluno.view";

const AlunosPage: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoModel[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<AlunoModel | null>(null);
  const [nomeFiltro, setNomeFiltro] = useState<string>("");

  // Função para carregar a lista de alunos
  const carregarAlunos = async () => {
    try {
      const lista = await AlunoController.listarAlunos(nomeFiltro);
      console.log(lista)
      setAlunos(lista);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  };

  // Função para carregar os detalhes de um aluno
  const carregarDetalhes = async (id: string) => {
    try {
      const aluno = await AlunoController.detalharAluno(id);
      setAlunoSelecionado(aluno || null);
    } catch (error) {
      console.error("Erro ao carregar detalhes do aluno:", error);
    }
  };

  return (
    <main className="max-w-[1200px] w-full flex flex-col">
      <h1>Consulta de Alunos</h1>

      {/* Renderizar o filtro */}
      {AlunoView.renderFiltro(nomeFiltro, setNomeFiltro, carregarAlunos)}

      {/* Renderizar a lista */}
      {AlunoView.renderLista(alunos, carregarDetalhes)}

      {/* Renderizar os detalhes */}
    </main>
  );
};

export default AlunosPage;
