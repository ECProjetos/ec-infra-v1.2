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

export function NewProgram() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Novo Programa</Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl !sm:max-w-4xl !max-w-4xl w-full mt-5 overflow-y-auto">
                <form className="max-h-[80vh]  p-6 space-y-6 bg-white rounded-xl">
                    <DialogHeader className="sticky top-0 bg-white z-10 pb-2">
                        <DialogTitle className="text-xl font-bold">Criação de Planos e Programas</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para cadastrar um novo programa ambiental.
                        </DialogDescription>
                    </DialogHeader>



                    {/* FOOTER */}
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
        </Dialog>
    );
}
