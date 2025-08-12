'use client';

import { ProgramaQag } from "@/components/programas/qag";
import { useState } from "react";

export default function SustentabilidadeDashboard() {
    const [formCategory, setFormCategory] = useState('');

    function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setFormCategory(event.target.value)

    }

    function renderFormByCategory(category: string) {
        switch (category) {
            case 'qag':
                return <ProgramaQag />;
            default:
                return null;
        }
    }

    return (
        <form className="px-15 py-10 ">
            <div className="mb-5">
                <h1 className="font-bold text-2xl">Cadastro de Planos e Programas</h1>
                <p className="py-2 text-gray-400">Interface dinâmica e completa para criação de P&P</p>
            </div>
            <div className=" bg-gray-50 p-5 rounded-md border-l-4 border-blue-600 shadow-md ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tipo do Programa */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Tipo do Programa</label>
                        <select
                            className="border rounded-md p-2 w-full bg-white"
                            onChange={handleTypeChange}
                            name="program_type"
                        >
                            <option></option>
                            <option value="qag">Programa de Qualidade da Água</option>
                        </select>
                    </div>

                    {/* Nome */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Nome</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="name"
                            placeholder="Nome do plano/Programa"
                        />
                    </div>

                    {/* Código */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Código</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="code"
                            placeholder="Ex: PMA-001"
                        />
                    </div>

                    {/* Responsável Técnico */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Responsável Técnico</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="rt_name"
                            placeholder="Nome do Responsável"
                        />
                    </div>

                    {/* Data de Início */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Data de Início</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            type="date"
                            name="start_date"
                        />
                    </div>

                    {/* Prazo de Execução */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Prazo de Execução</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="execution_date"
                            type="date"
                        />
                    </div>

                    {/* Descrição - ocupa as 3 colunas no desktop */}
                    <div className="flex flex-col md:col-span-3">
                        <label className="font-semibold">Descrição</label>
                        <textarea
                            className="bg-white w-full mt-2 border rounded-md p-2"
                            rows={4}
                            placeholder="Descreva os objetivos e escopo do plano/programa"
                        ></textarea>
                    </div>
                </div>
            </div>
            {renderFormByCategory(formCategory)}
        </form >
    )
}