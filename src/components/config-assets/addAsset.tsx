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
import { useActionState, useEffect } from "react";
import { ConfigAtivo } from "@/app/actions/ativos/configAtivo";
import { toast } from "sonner";

const initialState = { success: false, error: null as string | null };


export function CadastroTerminalPortuarioDialog() {
    const [state, formAction] = useActionState(
        async (prevState: { success: boolean; error: string | null }, formData: FormData) => {
            return await ConfigAtivo(formData);
        },
        initialState
    );
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
                    Configurar Ativo
                </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-5xl max-h-[85vh] overflow-y-auto">
                <form className="space-y-8 p-4" action={formAction}>
                    <DialogHeader className="sticky top-0 bg-white z-10">
                        <DialogTitle className="text-xl font-bold">
                            Cadastro de Terminal Portuário
                        </DialogTitle>
                        <DialogDescription>
                            Preencha todos os campos com atenção.
                        </DialogDescription>
                    </DialogHeader>

                    <Section title="📋 Informações Básicas" color="blue">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InputGroup label="Nome do Terminal" name="terminalName" />
                            <InputGroup label="Código do Terminal" name="terminalCode" />
                            <InputGroup label="Porto de Localização" name="portLocation" />
                            <InputGroup label="Data de Inauguração" name="inaugurationDate" type="date" />
                            <SelectGroup label="Status Operacional" name="operationalStatus" options={["Ativo", "Inativo", "Em Construção", "Planejado"]} />
                            <SelectGroup label="Status no Sistema" name="systemStatus" options={["Habilitado", "Desabilitado"]} />
                        </div>
                    </Section>

                    {/* 2. Informações Legais */}
                    <Section title="⚖️ Informações Legais" color="green">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InputGroup label="CNPJ da Concessionária" name="cnpj" />
                            <InputGroup label="Razão Social" name="corporateName" />
                            <InputGroup label="Número da Licença de Operação" name="licenseNumber" />
                            <SelectGroup label="Órgão Emissor da Licença" name="issuingAgency" options={["ANTAQ", "IBAMA", "Marinha do Brasil", "ANVISA"]} />
                            <InputGroup label="Validade da Licença" name="licenseValidity" type="date" />
                            <SelectGroup label="Certificação ISPS" name="ispsCertification" options={["Sim", "Não", "Em processo"]} />
                            <SelectGroup label="Regime de Exploração" name="explorationRegime" options={["Concessão", "Autorização", "Arrendamento", "Público"]} />
                            <InputGroup label="Prazo do Contrato" name="contractTerm" type="date" />
                        </div>
                    </Section>

                    {/* 3. Localização */}
                    <Section title="🌍 Localização" color="orange">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <InputGroup label="Área total (m²)" name="totalArea" />
                            <UploadKMLKMZ />
                        </div>
                        <BercoRepeater name="berths" />
                    </Section>

                    {/* 4. Infraestrutura */}
                    <Section title="⚙️ Infraestrutura" color="purple">
                        <InfraestruturaRepeater name="infrastructure" />
                    </Section>

                    <Section title="🏭 Equipamentos" color="purple">
                        <EquipamentoRepeater name="equipment" />
                    </Section>

                    {/* 5. Observações */}
                    <Section title="📝 Observações Adicionais" color="gray">
                        <TextareaGroup label="Principais Cargas Movimentadas" name="mainCargoTypes" placeholder="Descreva os principais tipos de carga..." />
                        <TextareaGroup label="Projetos de Expansão" name="expansionProjects" placeholder="Descreva projetos futuros..." />
                        <TextareaGroup label="Observações Gerais" name="generalNotes" placeholder="Informações gerais relevantes" />
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
    name,
    placeholder = "",
    type = "text",
    maxLength,
}: {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    maxLength?: number;
}) {
    return (
        <div>
            <Label className="mb-2" htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
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
    name,
    options,
}: {
    label: string;
    name: string;
    options: string[];
}) {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <select
                id={name}
                name={name}
                className="bg-white border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
            >
                <option value="">Selecione...</option>
                {options.map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
function TextareaGroup({
    label,
    name,
    placeholder = "",
}: {
    label: string;
    name: string;
    placeholder?: string;
}) {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Textarea
                id={name}
                name={name}
                className="bg-white mt-2"
                placeholder={placeholder}
            />
        </div>
    );
}
