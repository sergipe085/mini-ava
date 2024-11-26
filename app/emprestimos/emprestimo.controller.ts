import { AlunoModel } from "../alunos/aluno.model";
import { LivroModel } from "../livros/livro.model";
import { EmprestimoModel } from "./emprestimo.model";

class EmprestimoController {
  private emprestimos: EmprestimoModel[] = [];

  // Realizar empréstimo de um livro para um aluno
  realizarEmprestimo(aluno: AlunoModel, livro: LivroModel): EmprestimoModel {
    const novoEmprestimo = new EmprestimoModel(
      (this.emprestimos.length + 1).toString(), // Gerando ID sequencial para o empréstimo
      aluno,
      livro,
      new Date(), // Data atual como data de empréstimo
      null // Ainda sem data de devolução
    );
    // Adiciona o novo empréstimo à lista
    this.emprestimos.push(novoEmprestimo);
    return novoEmprestimo;
  }

  cancelarEmprestimo(emprestimo: EmprestimoModel) {
    const _emprestimo = this.emprestimos.find(
      (emp) => emp.id === emprestimo.id && !emp.canceladaEm
    );

    if (!emprestimo) {
      throw new Error("Matrícula não encontrada ou já está cancelada.");
    }

    // Cancela a matrícula
    _emprestimo.cancelar();
  }

  // Listar todos os empréstimos feitos por um aluno
  listarEmprestimosPorAluno(alunoId: string): EmprestimoModel[] {
    return this.emprestimos.filter(
      (emprestimo) => emprestimo.aluno.id === alunoId
    );
  }

  // Finalizar (devolver) um empréstimo pelo ID
  finalizarEmprestimo(emprestimo: EmprestimoModel): void {
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.devolvidoEm) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    // Marca o empréstimo como finalizado e altera o status do livro
    emprestimo.devolvidoEm = new Date();
    emprestimo.livro.status = "disponivel";
  }
}

export default new EmprestimoController();
