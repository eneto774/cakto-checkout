import { z } from "zod";
import { validateCpf } from "@/utils";

export const checkoutFormSchema = z.object({
  email: z.string().min(1, "Informe seu email.").email("Email inválido."),
  cpf: z
    .string()
    .min(1, "Informe seu CPF.")
    .refine(validateCpf, "CPF inválido."),
  paymentMethod: z.enum(["pix", "card"]),
  installment: z.number().int().min(1).max(12),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
