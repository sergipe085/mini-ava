import React, { useEffect, useState } from "react";
import { MatriculaModel } from "../matriculas/matricula.model";
import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";
import matriculaController from "../matriculas/matricula.controller";
import disciplinaView from "../disciplinas/disciplina.view";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrashIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

class MatriculaView {
  render({
    aluno,
  }: {
    aluno: AlunoModel | null;
  }) {
    const [matriculas, setMatriculas] = useState<MatriculaModel[]>([]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<DisciplinaModel | null>(null);

    // Carregar matrículas ao montar ou mudar o aluno
    useEffect(() => {
      if (aluno) {
        const alunoMatriculas = matriculaController.listarMatriculasPorAluno(aluno.id);
        setMatriculas(alunoMatriculas);
      }
    }, [aluno]);

    const handleAdicionarDisciplina = () => {
      if (aluno && disciplinaSelecionada) {
        matriculaController.realizarMatricula(aluno, disciplinaSelecionada);
        const alunoMatriculas = matriculaController.listarMatriculasPorAluno(aluno.id);
        setMatriculas(alunoMatriculas); // Atualiza o estado
        setDisciplinaSelecionada(null);
      }
    };

    const handleCancelarDisciplina = (matricula: MatriculaModel) => {
      if (matricula) {
        matriculaController.cancelarMatricula(matricula.id);
        const alunoMatriculas = matriculaController.listarMatriculasPorAluno(aluno.id);
        setMatriculas(alunoMatriculas); // Atualiza o estado
      }
    };

    if (!aluno) return null;

    return (
      <div>
        <h2>Matrículas</h2>

        {/* Accordion de Disciplinas Matriculadas */}
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="disciplinas">
            <div className="flex flex-row gap-2">
              <AccordionTrigger className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
                Disciplinas Matriculadas ({matriculas.filter(m => !m.canceladaEm).length})
              </AccordionTrigger>
              {
                aluno.estaAtivo() && aluno.modalidade == "Presencial" && (
                  <Dialog>
                    <DialogTrigger className="ml-auto">
                      <Button variant="ghost" size="icon">
                        +
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <disciplinaView.renderSeletor
                        curso={aluno.curso}
                        disciplinaSelecionada={disciplinaSelecionada}
                        setDisciplinaSelecionada={setDisciplinaSelecionada}
                      />
                      <DialogFooter>
                        <DialogClose>
                          <Button onClick={handleAdicionarDisciplina} disabled={!disciplinaSelecionada}>Adicionar</Button>
                        </DialogClose>
                        <DialogClose>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )
              }
            </div>
            <AccordionContent className="p-4 bg-gray-50 rounded-md">
              {matriculas.length > 0 ? (
                <ul>
                  {matriculas.map((matricula) => (
                    <li key={matricula.id} className="mb-2 text-gray-700">
                      <h1>{matricula.disciplina.nome}</h1>
                      
                      {matricula.canceladaEm ? (
                        <p className="subtitle">Cancelada em {matricula.canceladaEm.toLocaleString("pt-BR")}</p>
                      ) : (
                        <ConfirmationModal 
                          action={async () => await handleCancelarDisciplina(matricula)}
                          variant="destructive"
                          title="Tem certeza que deseja cancelar matricula?"
                          description=""
                        >
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="text-red-500" />
                          </Button>
                        </ConfirmationModal>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhuma disciplina matriculada.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default new MatriculaView();
