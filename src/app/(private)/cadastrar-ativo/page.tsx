'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { CreateAtivo } from "@/app/actions/ativos/ativo";
import { toast } from 'sonner'
import { getUserSession } from "@/app/(auth)/actions";

const initialState = { success: false, error: null as string | null };

export default function CadastrarAtivoPage() {
    const [state, formAction] = useActionState(
        async (prevState: { success: boolean; error: string | null }, formData: FormData) => {
            return await CreateAtivo(formData);
        },
        initialState
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userId, setUserId] = useState<any>();

    useEffect(() => {
        getUserSession().then(session => {
            setUserId(session?.user?.id);
        });
    }, []);


    useEffect(() => {
        if (state.success) {
            toast.success("Ativo cadastrado com sucesso!");
        }
        if (state.error) {
            toast.error(`Erro ao cadastrar ativo: ${state.error}`);
        }
    }, [state]);

    return (
        <form className="max-h-[80vh]  p-10 space-y-6 bg-white rounded-xl " action={formAction}>
            <input type="hidden" name="user_id" value={userId} />
            <div className="rounded-lg p-4 space-y-4 bg-gray-50 border-l-4 border-blue-600 space-y-3">
                <h3 className="font-semibold text-lg">Informações Básicas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold">Nome</label>
                        <input name="name" className="bg-white border-1 p-1 rounded-md" placeholder="Nome do ativo" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="url" className="mb-2 font-semibold">Sigla</label>
                        <input name="url" className="bg-white border-1 p-1 rounded-md" placeholder="Como o ativo vai aparecer na URL" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="uf" className="mb-2 font-semibold">UF</label>
                        <input
                            name="uf"
                            className="bg-white border-1 p-1 rounded-md"
                            placeholder="UF do ativo"
                            maxLength={2}
                            pattern="[A-Za-z]{2}"
                            title="Digite no máximo duas letras"
                        />
                    </div>
                    <div className="flex flex-col" >
                        <label htmlFor="city" className="mb-2 font-semibold">Cidade</label>
                        <input name="city" className="bg-white border-1 p-1 rounded-md" placeholder="Cidade do ativo" />

                    </div>

                    <div className="col-span-2">
                        <label className="font-semibold" htmlFor="descricao">Descrição</label>
                        <Textarea name="description" className="bg-white border-1 p-1 rounded-md mt-2" placeholder="Descreva os objetivos e escopo do programa..." />
                    </div>
                </div>
            </div>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 ">
                Cadastrar ativo
            </Button>

        </form>

    )
}