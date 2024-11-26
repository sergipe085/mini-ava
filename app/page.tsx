"use client"

import React, { useState, useEffect } from "react";
import { AlunoModel } from "./alunos/aluno.model";
import AlunoController from "./alunos/aluno.controller";
import AlunoView from "./alunos/aluno.view";
import { FilterComponent } from "@/components/ui/filter";
import alunoController from "./alunos/aluno.controller";
import { Card, CardContent } from "@/components/ui/card";

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

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Erro global:', event.message);
      alert('Erro detectado: ' + event.message);
    };
  
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Rejeição não tratada:', event.reason);
      alert('Erro de promessa não tratada!');
    };
  
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <main className="max-w-[1200px] w-full flex flex-col justify-center items-start pt-8">
      <h1 className="font-bold text-2xl">Gerenciamento de Alunos</h1>
      <h2 className="font-normal text-xl">Unifor</h2>

      <Card className="w-full mb-8">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="w-full flex">
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
          </div>

          {/* Renderizar o filtro */}
          {AlunoView.renderFiltro(nomeFiltro, setNomeFiltro, carregarAlunos)}
        </CardContent>
      </Card>
      
      {/* Renderizar a lista */}
      {AlunoView.renderLista(alunos)}

      {/* Renderizar os detalhes */}
    </main>
  );
};

export default AlunosPage;
