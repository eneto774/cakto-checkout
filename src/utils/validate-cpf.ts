import { cpf } from "cpf-cnpj-validator";

export const validateCpf = (value: string): boolean => cpf.isValid(value);
