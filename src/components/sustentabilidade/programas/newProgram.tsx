import { useState } from "react";
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export function NewProgram() {
    const [indicators, setIndicators] = useState([{ id: 1 }]);

    const addIndicator = () => {
        setIndicators((prev) => [...prev, { id: prev.length + 1 }]);
    };

    const removeIndicator = (id: number) => {
        setIndicators((prev) => prev.filter((i) => i.id !== id));
    };

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

                    {/* INFORMAÇÕES BÁSICAS */}
                    <div className="rounded-lg p-4 space-y-4 bg-gray-50 border-l-4 border-blue-600">
                        <h3 className="font-semibold text-lg">Informações Básicas</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Template do Programa</Label>
                                <Select>
                                    <SelectTrigger className="bg-white mt-2">
                                        <SelectValue placeholder="Selecione um template..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">Template 1</SelectItem>
                                        <SelectItem value="template2">Template 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Categoria</Label>
                                <Select>
                                    <SelectTrigger className="bg-white mt-2">
                                        <SelectValue placeholder="Programa Básico" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basico">Programa Básico</SelectItem>
                                        <SelectItem value="especifico">Programa Específico</SelectItem>
                                        <SelectItem value="voluntario">Programa Voluntário</SelectItem>
                                    </SelectContent>
                                </Select>
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

                    {/* GESTÃO E RESPONSABILIDADES */}
                    <div className="rounded-lg p-4 space-y-4 bg-gray-50 border-l-4 border-blue-600">
                        <h3 className="font-semibold text-lg">Gestão e Responsabilidades</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <Label>Responsável Técnico</Label>
                                <Input className="bg-white mt-2" placeholder="Nome do responsável" />
                            </div>
                            <div>
                                <Label>Data de Início</Label>
                                <Input className="bg-white mt-2" type="date" />
                            </div>
                            <div>
                                <Label>Frequência de Monitoramento</Label>
                                <Select>
                                    <SelectTrigger className="bg-white mt-2 w-full">
                                        <SelectValue placeholder="Mensal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mensal">Mensal</SelectItem>
                                        <SelectItem value="semanal">Semanal</SelectItem>
                                        <SelectItem value="trimestral">Trimestral</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* INDICADORES DE DESEMPENHO */}
                    <div className="rounded-lg p-8 space-y-4 bg-gray-50 border-l-4 border-blue-600">
                        <h3 className="font-semibold text-lg">Indicadores de Desempenho</h3>

                        {indicators.map((indicator) => (
                            <div key={indicator.id} className="grid md:grid-cols-5 gap-4 items-end ">
                                <div>
                                    <Label>Indicador</Label>
                                    <Input className="bg-white mt-2" placeholder="Nome do indicador" />
                                </div>
                                <div>
                                    <Label>Unidade</Label>
                                    <Input className="bg-white mt-2" placeholder="Ex: mg/L, dB(A), %" />
                                </div>
                                <div>
                                    <Label>Meta</Label>
                                    <Input className="bg-white mt-2" placeholder="Valor meta" />
                                </div>
                                <div>
                                    <Label>Frequência</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white mt-2">
                                            <SelectValue placeholder="Semanal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="semanal">Semanal</SelectItem>
                                            <SelectItem value="mensal">Mensal</SelectItem>
                                            <SelectItem value="anual">Anual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeIndicator(indicator.id)}
                                    className="text-red-600 hover:bg-red-100"
                                    type="button"
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        ))}

                        <Button type="button" onClick={addIndicator} className="mt-2 bg-green-600 hover:bg-green-700">
                            + Adicionar Indicador
                        </Button>
                    </div>

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
