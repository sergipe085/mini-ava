import React, { useEffect, useState } from "react";
import { AlunoModel } from "./aluno.model";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CrossIcon, SearchIcon, TrashIcon } from "lucide-react";
import disciplinaView from "../disciplinas/disciplina.view";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import matriculaController from "../matriculas/matricula.controller";
import disciplinaController from "../disciplinas/disciplina.controller";
import { DisciplinaModel } from "../disciplinas/disciplina.model";
import { MatriculaModel } from "../matriculas/matricula.model";
import LivroView from "../livros/livro.view";
import { LivroModel } from "../livros/livro.model";
import { EmprestimoModel } from "../emprestimos/emprestimo.model";
import emprestimoController from "../emprestimos/emprestimo.controller";
import MatriculaView from "../matriculas/matricula.view";
import EmprestimoView from "../emprestimos/emprestimo.view";

class AlunoView {
  // Método para o componente de filtro
  renderFiltro(
    nomeFiltro: string,
    setNomeFiltro: React.Dispatch<React.SetStateAction<string>>,
    onFiltrar: () => void
  ) {
    return (
      <div className="flex flex-row gap-2 w-full">
        <Input
            type="text"
            placeholder="Pesquisar por nome"
            value={nomeFiltro}
            onChange={(e) => setNomeFiltro(e.target.value)}
        />
        <Button onClick={onFiltrar}>
            <SearchIcon/>
        </Button>
      </div>
    );
  }

  // Método para o componente de listagem
  renderLista(
    alunos: AlunoModel[],
  ) {
    return (
      <div className="w-full">
        <h2>Lista de Alunos</h2>
        
        {true ? (
          <Table>
            <TableHeader>
                <TableHead>Nome</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Modalidade</TableHead>
                <TableHead>Status</TableHead>
            </TableHeader>
            <TableBody>
                {alunos.map((aluno) => (
                    <Dialog>
                        <DialogTrigger asChild>
                            <TableRow key={aluno.id} className="cursor-pointer">
                                <TableCell>{aluno.nome}</TableCell>
                                <TableCell>{aluno.curso}</TableCell>
                                <TableCell>{aluno.modalidade}</TableCell>
                                <TableCell>{aluno.status}</TableCell>
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

        <MatriculaView.render aluno={aluno}/>
        <EmprestimoView.render aluno={aluno}/>
      </div>
    );
  }
}

export default new AlunoView();
