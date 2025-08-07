import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(2, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha mínima de 6 caracteres"),
    confirm_password: z.string().min(6, "Confirme a senha"),
}).refine((data) => data.senha === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirmSenha"], // Aparece o erro no campo de confirmação
});
