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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadKMLKMZ } from "./uploadKML";
import { BercoRepeater } from "./bercoRepeater";
import { InfraestruturaRepeater } from "./infraestruturaRepeater";
import { EquipamentoRepeater } from "./equipRepeater";

export function CadastroTerminalPortuarioDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Configurar Ativo
                </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-5xl max-h-[85vh] overflow-y-auto">
                <form className="space-y-8 p-4">
                    <DialogHeader className="sticky top-0 bg-white z-10">
                        <DialogTitle className="text-xl font-bold">
                            Cadastro de Terminal Portuário
                        </DialogTitle>
                        <DialogDescription>
                            Preencha todos os campos com atenção.
                        </DialogDescription>
                    </DialogHeader>

                    {/* 1. Informações Básicas */}
                    <Section title="📋 Informações Básicas" color="blue">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InputGroup label="Nome do Terminal" />
                            <InputGroup label="Código do Terminal" />
                            <InputGroup label="Porto de Localização" />
                            <InputGroup label="Data de Inauguração" type="date" />
                            <SelectGroup
                                label="Status Operacional"
                                options={["Ativo", "Inativo", "Em Construção", "Planejado"]}
                            />
                            <SelectGroup
                                label="Status no Sistema"
                                options={["Habilitado", "Desabilitado"]}
                            />
                        </div>
                    </Section>

                    {/* 2. Informações Legais */}
                    <Section title="⚖️ Informações Legais" color="green">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InputGroup label="CNPJ da Concessionária" />
                            <InputGroup label="Razão Social" />
                            <InputGroup label="Número da Licença de Operação" />
                            <SelectGroup label="Órgão Emissor da Licença" options={["ANTAQ", "IBAMA", "Marinha do Brasil", "ANVISA"]} />
                            <InputGroup label="Validade da Licença" type="date" />
                            <SelectGroup label="Certificação ISPS" options={["Sim", "Não", "Em processo"]} />
                            <SelectGroup label="Regime de Exploração" options={["Concessão", "Autorização", "Arrendamento", "Público"]} />
                            <InputGroup label="Prazo do Contrato" type="date" />
                        </div>
                    </Section>

                    {/* 3. Localização */}
                    <Section title="🌍 Localização" color="orange">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <InputGroup label="Área total (m²)" maxLength={2} />
                            <UploadKMLKMZ />

                        </div>
                        <BercoRepeater />

                    </Section>

                    {/* 4. Infraestrutura */}
                    <Section title="⚙️ Infraestrutura" color="purple">
                        <InfraestruturaRepeater />
                    </Section>

                    <Section title="🏭  Equipamentos" color="purple">
                        <EquipamentoRepeater />
                    </Section>



                    {/* 5. Observações */}
                    <Section title="📝 Observações Adicionais" color="gray">
                        <TextareaGroup label="Principais Cargas Movimentadas" placeholder="Descreva os principais tipos de carga..." />
                        <TextareaGroup label="Projetos de Expansão" placeholder="Descreva projetos futuros..." />
                        <TextareaGroup label="Observações Gerais" placeholder="Informações gerais relevantes" />
                    </Section>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Salvar Configurações
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ===========================
// COMPONENTES AUXILIARES
// ===========================

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
    color?: string;
}) {


    return (
        <div className={`rounded-lg p-6 space-y-4 bg-gray-50 border-l-4 border-blue-600`}>
            <h3 className="font-semibold text-lg">{title}</h3>
            {children}
        </div>
    );
}

function InputGroup({
    label,
    placeholder = "",
    type = "text",
    maxLength,
}: {
    label: string;
    placeholder?: string;
    type?: string;
    maxLength?: number;
}) {
    return (
        <div>
            <Label className="mb-2">{label}</Label>
            <Input
                className="bg-white mt-1"
                placeholder={placeholder}
                type={type}
                maxLength={maxLength}
            />
        </div>
    );
}

function SelectGroup({
    label,
    options,
}: {
    label: string;
    options: string[];
}) {
    return (
        <div>
            <Label>{label}</Label>
            <select className="bg-white border border-gray-300 rounded-md w-full px-3 py-2 mt-1">
                <option value="">Selecione...</option>
                {options.map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function TextareaGroup({
    label,
    placeholder = "",
}: {
    label: string;
    placeholder?: string;
}) {
    return (
        <div>
            <Label>{label}</Label>
            <Textarea
                className="bg-white mt-2"
                placeholder={placeholder}
            />
        </div>
    );
}