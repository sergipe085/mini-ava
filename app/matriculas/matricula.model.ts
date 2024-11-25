import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";

export class MatriculaModel {
  id: string;
  aluno: AlunoModel;
  disciplina: DisciplinaModel;
  realizadaEm: Date | undefined;
  canceladaEm: Date | undefined;

  constructor(aluno: AlunoModel, disciplina: DisciplinaModel) {
    this.id = Date.now().toString();
    this.aluno = aluno;
    this.disciplina = disciplina;
    this.realizadaEm = new Date(); // Define a data de realização como agora
    this.canceladaEm = undefined;
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

  /**
   * Reativa a matrícula caso tenha sido cancelada
   */
  reativar(): void {
    if (this.estaAtiva()) {
      throw new Error("Matrícula já está ativa.");
    }
    this.canceladaEm = undefined; // Remove a data de cancelamento
  }

  /**
   * Obtém informações resumidas da matrícula
   * @returns {string} - Resumo da matrícula
   */
  obterResumo(): string {
    return `
      Aluno: ${this.aluno.nome}
      Disciplina: ${this.disciplina.nome}
      Realizada em: ${this.realizadaEm?.toLocaleDateString()}
      ${this.estaAtiva() ? "Matrícula ativa" : `Cancelada em: ${this.canceladaEm?.toLocaleDateString()}`}
    `;
  }
}
