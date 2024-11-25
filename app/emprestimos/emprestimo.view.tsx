import React, { useEffect, useState } from "react";
import { EmprestimoModel } from "../emprestimos/emprestimo.model";
import { AlunoModel } from "../alunos/aluno.model";
import { LivroModel } from "../livros/livro.model";
import emprestimoController from "../emprestimos/emprestimo.controller";
import LivroView from "../livros/livro.view";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { TrashIcon } from "lucide-react";

class EmprestimoView {
  render({
    aluno,
  }: {
    aluno: AlunoModel | null;
  }) {
    const [emprestimos, setEmprestimos] = useState<EmprestimoModel[]>([]);
    const [livroSelecionado, setLivroSelecionado] = useState<LivroModel | null>(null);

    // Carregar empréstimos ao montar ou mudar o aluno
    useEffect(() => {
      if (aluno) {
        const alunoEmprestimos = emprestimoController.listarEmprestimosPorAluno(aluno.id);
        setEmprestimos(alunoEmprestimos);
      }
    }, [aluno]);

    const handleAdicionarEmprestimo = () => {
      if (aluno && livroSelecionado) {
        emprestimoController.realizarEmprestimo(aluno, livroSelecionado);
        const alunoEmprestimos = emprestimoController.listarEmprestimosPorAluno(aluno.id);
        setEmprestimos(alunoEmprestimos); // Atualiza o estado
        setLivroSelecionado(null);
      }
    };

    const handleCancelarEmprestimo = (emprestimo: EmprestimoModel) => {
      if (emprestimo) {
        emprestimoController.cancelarEmprestimo(emprestimo);
        const alunoEmprestimos = emprestimoController.listarEmprestimosPorAluno(aluno.id);
        setEmprestimos(alunoEmprestimos); // Atualiza o estado
      }
    };

    if (!aluno) return null;

    return (
      <div>
        <h2>Empréstimos</h2>

        {/* Accordion de Livros Emprestados */}
        <Accordion type="single" collapsible>
          <AccordionItem value="livros">
            <div className="flex flex-row gap-2">
              <AccordionTrigger className="bg-green-100 text-green-600 px-4 py-2 rounded-md">
                Livros Emprestados ({emprestimos.length})
              </AccordionTrigger>
              <Dialog>
                <DialogTrigger className="ml-auto">
                  <Button variant="ghost" size="icon">
                    +
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <LivroView.renderSeletor
                    livroSelecionado={livroSelecionado}
                    setLivroSelecionado={setLivroSelecionado}
                  />
                  <DialogFooter>
                    <DialogClose>
                      <Button onClick={handleAdicionarEmprestimo} disabled={!livroSelecionado}>Adicionar</Button>
                    </DialogClose>
                    <DialogClose>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <AccordionContent className="p-4 bg-gray-50 rounded-md">
              {emprestimos.length > 0 ? (
                <ul>
                  {emprestimos.map((emprestimo) => (
                    <li key={emprestimo.id} className="mb-2 text-gray-700">
                      {emprestimo.livro.titulo}
                      {emprestimo.canceladaEm ? (
                        <p className="subtitle">Cancelada em {emprestimo.canceladaEm.toLocaleString("pt-BR")}</p>
                      ) : (
                        <ConfirmationModal action={async () => await handleCancelarEmprestimo(emprestimo)}>
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="text-red-500" />
                          </Button>
                        </ConfirmationModal>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhum livro emprestado.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default new EmprestimoView();