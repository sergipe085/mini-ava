import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";

export class MatriculaModel {
  id: string;
  aluno: AlunoModel;
  disciplina: DisciplinaModel;
  realizadaEm: Date | undefined;
  canceladaEm: Date | undefined;

  constructor(aluno: AlunoModel, disciplina: DisciplinaModel) {
    if (aluno.status != "Ativo") {
      throw new Error(`O aluno nao esta ativo.`)
    }

    if (aluno.modalidade != "Presencial") {
      throw new Error(`O aluno nao esta inscrito na modalidade Presencial.`)
    }

    this.id = Date.now().toString();
    this.aluno = aluno;
    this.disciplina = disciplina;
    this.realizadaEm = new Date(); // Define a data de realização como agora
    this.canceladaEm = undefined;
  }

  estaAtiva(): boolean {
    return !this.canceladaEm; // Está ativa se `canceladaEm` for undefined
  }

  cancelar(): void {
    if (!this.estaAtiva()) {
      throw new Error("Matrícula já está cancelada.");
    }
    this.canceladaEm = new Date(); // Define a data de cancelamento como agora
  }

  reativar(): void {
    if (this.estaAtiva()) {
      throw new Error("Matrícula já está ativa.");
    }
    this.canceladaEm = undefined; // Remove a data de cancelamento
  }

  obterResumo(): string {
    return `
      Aluno: ${this.aluno.nome}
      Disciplina: ${this.disciplina.nome}
      Realizada em: ${this.realizadaEm?.toLocaleDateString()}
      ${this.estaAtiva() ? "Matrícula ativa" : `Cancelada em: ${this.canceladaEm?.toLocaleDateString()}`}
    `;
  }
}
