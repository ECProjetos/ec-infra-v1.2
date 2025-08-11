"use client";


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LabForm } from "./labForm";

export function ConfigurarLaboratorios() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Configurar Laboratórios
                </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-5xl max-h-[85vh] overflow-y-auto">

                <DialogHeader className="sticky top-0 bg-white z-10">
                    <DialogTitle className="text-xl font-bold">
                        Configuração de Laboratórios
                    </DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos com atenção.
                    </DialogDescription>
                </DialogHeader>
                <LabForm />
            </DialogContent>
        </Dialog >
    );
}

