import React, { useState } from "react";
import { AlunoModel } from "./aluno.model";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import disciplinaView from "../disciplinas/disciplina.view";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import matriculaController from "../matriculas/matricula.controller";
import disciplinaController from "../disciplinas/disciplina.controller";
import { DisciplinaModel } from "../disciplinas/disciplina.model";

class AlunoView {
  // Método para o componente de filtro
  renderFiltro(
    nomeFiltro: string,
    setNomeFiltro: React.Dispatch<React.SetStateAction<string>>,
    onFiltrar: () => void
  ) {
    return (
      <div className="flex flex-row">
        <Input
            type="text"
            placeholder="Pesquisar por nome"
            value={nomeFiltro}
            onChange={(e) => setNomeFiltro(e.target.value)}
        />
        <Button  onClick={onFiltrar}>
            <SearchIcon/>
        </Button>
      </div>
    );
  }

  // Método para o componente de listagem
  renderLista(
    alunos: AlunoModel[],
    onSelecionar: (id: string) => void
  ) {
    return (
      <div>
        <h2>Lista de Alunos</h2>
        
        {alunos.length > 0 ? (
          <Table>
            <TableHeader>
                <TableHead>Nome</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Modalidade</TableHead>
            </TableHeader>
            <TableBody>
                {alunos.map((aluno) => (
                    <Dialog>
                        <DialogTrigger asChild>
                            <TableRow key={aluno.id} className="cursor-pointer">
                                <TableCell>{aluno.nome}</TableCell>
                                <TableCell>{aluno.curso}</TableCell>
                                <TableCell>{aluno.modalidade}</TableCell>
                            </TableRow>
                        </DialogTrigger>
                        <DialogContent>
                          <this.renderDetalhes aluno={aluno}/>
                        </DialogContent>
                    </Dialog>
                ))}
            </TableBody>
        </Table>
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
      </div>
    );
  }

  // Método para o componente de detalhes
  renderDetalhes(
    { aluno } : {
      aluno: AlunoModel | null,
    }
  ) {
    if (!aluno) return null;

    // matriculaController.realizarMatricula(aluno, disciplinaController.buscarPorCurso("historia")[0]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<DisciplinaModel>();

    const matriculas = matriculaController.listarMatriculasPorAluno(aluno.id);

    return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes do Aluno</h2>
      
      {/* Informações do aluno */}
      <div className="mb-4">
        <p><strong>ID:</strong> {aluno.id}</p>
        <p><strong>Nome:</strong> {aluno.nome}</p>
        <p><strong>Curso:</strong> {aluno.curso}</p>
        <p><strong>Modalidade:</strong> {aluno.modalidade}</p>
        <p><strong>Status:</strong> {aluno.status}</p>
      </div>

      {/* Seletor de disciplina */}
      <div className="mb-4">
        <disciplinaView.renderSeletor curso={aluno.curso} onSelect={setDisciplinaSelecionada}/>
        <Button onClick={() => {
          if (disciplinaSelecionada) {
            matriculaController.realizarMatricula(aluno, disciplinaSelecionada);
          }
        }}>Adicionar</Button>
      </div>

      {/* Accordion de Disciplinas Matriculadas */}
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="disciplinas">
          <AccordionTrigger className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
            Disciplinas Matriculadas
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50 rounded-md">
            {matriculas.length > 0 ? (
              <ul>
                {matriculas.map((disciplina, index) => (
                  <li key={index} className="mb-2 text-gray-700">
                    {disciplina.disciplina.nome}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhuma disciplina matriculada.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Accordion de Livros Emprestados */}
      <Accordion type="single" collapsible>
        <AccordionItem value="livros">
          <AccordionTrigger className="bg-green-100 text-green-600 px-4 py-2 rounded-md">
            Livros Emprestados
          </AccordionTrigger>
          {/* <AccordionContent className="p-4 bg-gray-50 rounded-md">
            {livrosEmprestados.length > 0 ? (
              <ul>
                {livrosEmprestados.map((livro, index) => (
                  <li key={index} className="mb-2 text-gray-700">
                    {livro}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum livro emprestado.</p>
            )}
          </AccordionContent> */}
        </AccordionItem>
      </Accordion>
    </div>
    );
  }
}

export default new AlunoView();
