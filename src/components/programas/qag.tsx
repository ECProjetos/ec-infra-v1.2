
import { useEffect, useState } from "react";

interface ProgramaQagProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFormChange: (data: any) => void;
}

export function ProgramaQag({
    onFormChange
}: ProgramaQagProps) {
    const [formData, setFormData] = useState({
        metodology: '',
        sample_type: '',
        sample_shower: '',
        container_type: '',
        container_moving: '',
    });

    useEffect(() => {
        onFormChange(formData);
    }, [formData, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div>
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md">
                <div>
                    <label className="font-semibold">Localização dos Pontos de monitoramento</label>
                    <input type="file" accept=".csv" className="border border-dashed p-6 w-full bg-white mt-3 mb-3" />
                </div>
                <div>
                    <label className="font-semibold">Parâmetros e periodicidade</label>
                    <input type="file" accept=".csv" className="border border-dashed p-6 w-full bg-white mt-3" />
                </div>
            </div>
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md space-y-3">
                <h1 className="font-bold text-xl">Dados Laboritoriais</h1>
                <div>
                    <label className="font-semibold">Metodologia adotada</label>
                    <input name="metodology" className="border  p-2 w-full bg-white mt-3" value={formData.metodology} onChange={handleChange} />
                </div>
                <div>
                    <label className="font-semibold">Tipo de amostragem</label>
                    <input name="sample_type" className="border  p-2 w-full bg-white mt-3" value={formData.sample_type} onChange={handleChange} />
                </div>
                <div>
                    <label className="font-semibold">Amostrador de coleta</label>
                    <input name="sample_shower" className="border  p-2 w-full bg-white mt-3" value={formData.sample_shower} onChange={handleChange} />
                </div>
                <div>
                    <label className="font-semibold">Tipo de frasco de armazenamento</label>
                    <input name="container_type" className="border p-2 w-full bg-white mt-3" value={formData.container_type} onChange={handleChange} />
                </div>
                <div>
                    <label className="font-semibold">Equipamento de Armazenamento para Transporte</label>
                    <input name="container_moving" className="border  p-2 w-full bg-white mt-3" value={formData.container_moving} onChange={handleChange} />
                </div>
            </div>
        </div>

    )
}