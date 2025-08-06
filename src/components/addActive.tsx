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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


export function NewProgram() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white p-2">Configurar Ativo</Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl !sm:max-w-4xl !max-w-4xl w-full mt-5 overflow-y-auto">
                <form className="max-h-[80vh]  p-6 space-y-6 bg-white rounded-xl">
                    <DialogHeader className="sticky top-0 bg-white z-10 pb-2">
                        <DialogTitle className="text-xl font-bold">Configuração de ativo</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para configurar o ativo.
                        </DialogDescription>
                    </DialogHeader>

                    {/* INFORMAÇÕES BÁSICAS */}
                    <div className="rounded-lg p-4 space-y-4 bg-gray-50 border-l-4 border-blue-600">
                        <h3 className="font-semibold text-lg">Informações Básicas</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Nome</Label>
                                <Input className="bg-white" placeholder="Nome do ativo" />
                            </div>
                            <div>
                                <Label className="mb-2">CNPJ</Label>
                                <Input className="bg-white" placeholder="CNPJ do ativo" />

                            </div>
                            <div className="col-span-2">
                                <Label>Nome do Programa</Label>
                                <Input className="bg-white mt-2" placeholder="Ex: Programa de Qualidade das Águas Portuárias" />
                            </div>
                            <div className="col-span-2">
                                <Label>Descrição</Label>
                                <Textarea className="bg-white mt-2" placeholder="Descreva os objetivos e escopo do programa..." />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Salvar Programa
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
