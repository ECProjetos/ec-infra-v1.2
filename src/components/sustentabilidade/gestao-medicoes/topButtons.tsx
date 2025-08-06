'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { CalendarIcon, CalendarPlus, Clock, FileText, Save } from 'lucide-react'

export function NewMeasure() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Registrar Medição
                </Button>
            </DialogTrigger>

            <DialogContent className="!w-3xl">
                <form className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Registrar Medição</DialogTitle>
                    </DialogHeader>

                    {/* Programa e Indicador */}
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <Label className="mb-3">Programa</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um programa..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pqaa">PQAA</SelectItem>
                                    <SelectItem value="pca">PCA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-3">Indicador</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um indicador..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oxigenio">Oxigênio Dissolvido</SelectItem>
                                    <SelectItem value="ph">pH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Data e valor */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-3">Data da Medição</Label>
                            <div className="relative">
                                <Input type="date" />
                                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label className="mb-3">Valor Medido</Label>
                            <Input type="number" step="0.01" placeholder="0.00" />
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <Label className="mb-3">Observações</Label>
                        <Textarea placeholder="Observações sobre a medição..." />
                    </div>

                    {/* Ações */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Medição
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}




export function ScheduleAnalysisDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Agendar Análise
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl w-full">
                <form className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Agendar Análise/Medição</DialogTitle>
                    </DialogHeader>

                    {/* Linha: Programa e Indicador */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Programa</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um programa..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pqaa">PQAA</SelectItem>
                                    <SelectItem value="pca">PCA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Indicador</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um indicador..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oxigenio">Oxigênio Dissolvido</SelectItem>
                                    <SelectItem value="ph">pH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha: Data, Horário, Tipo de Análise */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <Label>Data Prevista</Label>
                            <div className="relative">
                                <Input type="date" />
                                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label>Horário</Label>
                            <div className="relative">
                                <Input type="time" />
                                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label>Tipo de Análise</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Medição em Campo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="campo">Medição em Campo</SelectItem>
                                    <SelectItem value="laboratorio">Análise Laboratorial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha: Responsável e Laboratório */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Responsável pela Coleta</Label>
                            <Input placeholder="Nome do responsável" />
                        </div>
                        <div>
                            <Label>Laboratório (se aplicável)</Label>
                            <Input placeholder="Nome do laboratório" />
                        </div>
                    </div>

                    {/* Pontos de Coleta */}
                    <div>
                        <Label>Pontos de Coleta/Medição</Label>
                        <Textarea placeholder="Descreva os pontos onde serão realizadas as medições..." />
                    </div>

                    {/* Observações */}
                    <div>
                        <Label>Observações</Label>
                        <Textarea placeholder="Observações adicionais sobre o agendamento..." />
                    </div>

                    {/* Botões */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                            <CalendarPlus className="w-4 h-4 mr-2" />
                            Agendar Análise
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export function ScheduleReportDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Agendar Relatório
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl w-full">
                <form className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Agendar Relatório</DialogTitle>
                    </DialogHeader>

                    {/* Linha: Programa e Tipo de Relatório */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Programa</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um programa..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pqaa">PQAA</SelectItem>
                                    <SelectItem value="pca">PCA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-2">Tipo de Relatório</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Relatório Mensal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mensal">Relatório Mensal</SelectItem>
                                    <SelectItem value="trimestral">Relatório Trimestral</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha: Data de Entrega e Responsável */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Data de Entrega</Label>
                            <Input type="date" />
                        </div>
                        <div>
                            <Label className="mb-2">Responsável pela Elaboração</Label>
                            <Input placeholder="Nome do responsável" />
                        </div>
                    </div>

                    {/* Linha: Período de Referência */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Período de Referência (Início)</Label>
                            <Input type="date" />
                        </div>
                        <div>
                            <Label className="mb-2">Período de Referência (Fim)</Label>
                            <Input type="date" />
                        </div>
                    </div>

                    {/* Destinatários */}
                    <div>
                        <Label className="mb-2">Destinatários</Label>
                        <div className="grid sm:grid-cols-2 gap-2 mt-2 text-sm text-gray-700">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                ANTAQ
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                IBAMA
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                Órgão Ambiental Estadual
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                Autoridade Portuária
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                Outros
                            </label>
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <Label className='mb-2 '>Observações</Label>
                        <Textarea placeholder="Observações sobre o relatório..." />
                    </div>

                    {/* Botões */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-700">
                            <FileText className="w-4 h-4 mr-2" />
                            Agendar Relatório
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}