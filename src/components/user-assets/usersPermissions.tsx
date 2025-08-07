"use client";


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect } from "react";
import { ConfigAtivo } from "@/app/actions/ativos/configAtivo";
import { toast } from "sonner";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { GroupRepeater } from "./groupRepeater";

const initialState = { success: false, error: null as string | null };


export function ConfigurarUsuarios() {
    const [state, formAction] = useActionState(
        async (prevState: { success: boolean; error: string | null }, formData: FormData) => {
            return await ConfigAtivo(formData);
        },
        initialState
    );
    const asset = useAtivoStore()
    const assetId = asset.ativo?.id;

    useEffect(() => {
        if (state.success) {
            toast.success("Ativo configurado com sucesso!");
        }
        if (state.error) {
            toast.error(`Erro ao configurar ativo: ${state.error}`);
        }
    }, [state]);



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Configurar Usuários
                </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-5xl max-h-[85vh] overflow-y-auto">

                <DialogHeader className="sticky top-0 bg-white z-10">
                    <DialogTitle className="text-xl font-bold">
                        Configuração de usuários
                    </DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos com atenção.
                    </DialogDescription>
                </DialogHeader>
                <Tabs>
                    <TabsList>
                        <TabsTrigger value={"group"}>
                            Grupo
                        </TabsTrigger>
                        <TabsTrigger value={"user"}>
                            Usuário
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="group">
                        <form className="space-y-8 p-4" action={formAction}>
                            <input type="hidden" name="id" value={assetId ?? ""} />
                            <GroupRepeater name="group" />
                        </form>

                    </TabsContent>
                </Tabs>


                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                        Salvar Configurações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}

