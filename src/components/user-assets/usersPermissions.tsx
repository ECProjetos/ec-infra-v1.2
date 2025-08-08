"use client";


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import GroupRepeater from "./groupRepeater";
import UserRepeater from "./usersRepeater";

export function ConfigurarUsuarios() {
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
                        <GroupRepeater name="groups" />
                        <DialogClose asChild className="mx-3">
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                    </TabsContent>
                    <TabsContent value="user">
                        <div>
                            <UserRepeater name="users" />
                            <DialogClose asChild className="mx-3">
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                        </div>
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog >
    );
}

