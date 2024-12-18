import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";
import { LivroModel } from "../livros/livro.model";

export class EmprestimoModel {
  id: string;
  aluno: AlunoModel;
  livro: LivroModel;
  de: Date | null; // Null se o livro ainda não foi devolvido.
  realizadaEm: Date | undefined;
  canceladaEm: Date | undefined;
  devolvidoEm:  Date | undefined;

  constructor(
    id: string,
    aluno: AlunoModel,
    livro: LivroModel,
    dataEmprestimo: Date,
    dataDevolucao: Date | null
  ) {
    if (livro.status !== "disponivel") {
      throw new Error("O livro não está disponível para empréstimo.");
    }

    if (!aluno.estaAtivo()) {
      throw new Error("O aluno nao esta ativo.");
    }

    this.id = id;
    this.aluno = aluno;
    this.livro = livro;
    this.realizadaEm = new Date();

    livro.emprestar();
  }

  /**
 * Verifica se a matrícula está ativa
 * @returns {boolean} - True se a matrícula está ativa, false caso contrário
 */
  estaAtiva(): boolean {
    return !this.canceladaEm; // Está ativa se `canceladaEm` for undefined
  }

  /**
   * Cancela a matrícula, definindo a data de cancelamento
   */
  cancelar(): void {
    if (!this.estaAtiva()) {
      throw new Error("Matrícula já está cancelada.");
    }
    this.canceladaEm = new Date(); // Define a data de cancelamento como agora
  }
 
}
