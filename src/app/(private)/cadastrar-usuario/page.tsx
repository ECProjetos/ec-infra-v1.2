'use client'

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { CreateUser } from "@/app/actions/users/createUser"
import { toast } from 'sonner'
import Link from "next/link";

const initialState = { success: false, error: undefined as string | undefined };

export default function CadastrarUsuárioPage() {
    const [state, formAction] = useActionState(
        async (prevState: { success: boolean; error?: string }, formData: FormData) => {
            return await CreateUser(formData);
        },
        initialState
    );

    useEffect(() => {
        if (state.success) {
            toast.success("Usuário cadastrado com sucesso!");
        }
        if (state.error) {
            toast.error(`Erro ao cadastrar Usuário: ${state.error}`);
        }
    }, [state]);

    return (
        <form className="max-h-[80vh]  p-10 space-y-6 bg-white rounded-xl " action={formAction}>
            <div className="rounded-lg p-4 space-y-4 bg-gray-50 border-l-4 border-blue-600 space-y-3">
                <h3 className="font-semibold text-lg">Cadastrar usuário</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold">Nome</label>
                        <input name="name" className="bg-white border-1 p-1 rounded-md" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 font-semibold">Email</label>
                        <input name="email" className="bg-white border-1 p-1 rounded-md" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="senha" className="mb-2 font-semibold">Senha</label>
                        <input
                            name="senha"
                            className="bg-white border-1 p-1 rounded-md"
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirm_password" className="mb-2 font-semibold">Confirmar senha</label>
                        <input
                            name="confirm_password"
                            className="bg-white border-1 p-1 rounded-md"
                            type="password"
                        />
                    </div>


                </div>
            </div>
            <div className=" flex space-x-3">
                <Link href={'/selecionar-ativo'}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Voltar
                    </Button>
                </Link>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 ">
                    Cadastrar usuário
                </Button>
            </div>

        </form>

    )
}