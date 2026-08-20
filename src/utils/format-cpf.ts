import { cpf } from "cpf-cnpj-validator";

export const formatCpf = (value: string): string => cpf.format(value);
