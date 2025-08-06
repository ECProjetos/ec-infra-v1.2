'use client'

import { NewMeasure, ScheduleAnalysisDialog, ScheduleReportDialog } from "@/components/sustentabilidade/gestao-medicoes/topButtons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Funnel } from "lucide-react"

export default function GestaoMedicoesPage() {
    return (
        <div className="px-10 py-10 space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Gestão de Medições e Monitoramento
                </h1>
                <div className="space-x-3">
                    <NewMeasure />
                    <ScheduleAnalysisDialog />
                    <ScheduleReportDialog />
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Filtros */}
            {/* Filtros */}
            <Card>
                <div className="p-3 flex flex-row justify-between items-center gap-3">
                    <div className="flex flex-col w-full">
                        <Label className="mb-2">Programa</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Todos os programas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os programas</SelectItem>
                                <SelectItem value="pqaa">PQAA</SelectItem>
                                <SelectItem value="pca">PCA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col w-full">
                        <Label className="mb-2">Status</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Todos os status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os status</SelectItem>
                                <SelectItem value="realizado">Realizado</SelectItem>
                                <SelectItem value="pendente">Pendente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Data Início */}
                    <div className="flex flex-col w-full">
                        <Label className="mb-2">Data Início</Label>
                        <Input type="date" />
                    </div>

                    <div className="flex flex-col w-full">
                        <Label className="mb-2">Data Fim</Label>
                        <Input type="date" />
                    </div>
                </div>
                <div className="flex flex-col items-end px-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Funnel className="w-4 h-4 mr-2" />
                        Aplicar Filtros
                    </Button>
                </div>

            </Card>
        </div>
    )
}
