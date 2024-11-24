import React, { useEffect, useState } from "react";
import { DisciplinaModel } from "./disciplina.model";
import disciplinaController from "./disciplina.controller";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

class DisciplinaView {
  // Método para renderizar um seletor de disciplinas
  renderSeletor({
    curso,
    onSelect,
  }: {
    curso: string,
    onSelect: (disciplina: DisciplinaModel) => void,
  }) {
    const [disciplinas, setDisciplinas] = useState<DisciplinaModel[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    // Carregar disciplinas ao montar o componente
    useEffect(() => {
      const carregarDisciplinas = async () => {
        try {
          setCarregando(true);
          const lista = await disciplinaController.buscarPorCurso(curso);
          setDisciplinas(lista);
        } catch (error) {
          console.error("Erro ao carregar disciplinas:", error);
        } finally {
          setCarregando(false);
        }
      };

      carregarDisciplinas();
    }, [curso]);

    if (carregando) {
      return <p>Carregando disciplinas...</p>;
    }

    return (
      <div>
        <Label htmlFor="seletor-disciplinas">Selecione uma disciplina:</Label>
        <Select onValueChange={(v) => onSelect(disciplinas.find(d => d.id == v))}>
            <SelectTrigger   id="seletor-disciplinas" className="">
                <SelectValue placeholder="Selecione uma disciplina" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Disciplinas</SelectLabel>

                {disciplinas.map((disciplina) => (
                     <SelectItem key={disciplina.id} value={disciplina.id}>{disciplina.nome}</SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>
    );
  }
}

export default new DisciplinaView();
