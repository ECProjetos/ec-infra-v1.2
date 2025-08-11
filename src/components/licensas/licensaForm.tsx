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

import { ConfigLicensa } from './configLicense'

export function CadastrarLicensa() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Cadastrar Licensa
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto">

                <DialogHeader className="sticky top-0 bg-white z-10">
                    <DialogTitle className="text-xl font-bold">
                        Cadastro de Licensas
                    </DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos com atenção.
                    </DialogDescription>
                </DialogHeader>
                <ConfigLicensa />
            </DialogContent>
        </Dialog >
    );
}

