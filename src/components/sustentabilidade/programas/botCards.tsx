interface ProgramaCardProps {
    titulo: string;
    descricao: string;
    responsavel: string;
    frequencia: string;
    status: "Conforme" | "Atenção" | "Crítico";
    corStatus: "green" | "yellow" | "red"; // para ícone e tag
}

export function ProgramaCard({
    titulo,
    descricao,
    responsavel,
    frequencia,
    status,
    corStatus,
}: ProgramaCardProps) {
    const statusColors = {
        green: {
            dot: "bg-green-500",
            badge: "bg-green-100 text-green-700",
        },
        yellow: {
            dot: "bg-yellow-500",
            badge: "bg-yellow-100 text-yellow-700",
        },
        red: {
            dot: "bg-red-500",
            badge: "bg-red-100 text-red-700",
        },
    };

    return (
        <div className="relative bg-white rounded-xl border-l-4 border-green-500 shadow-sm p-6 flex flex-col gap-2 w-full">
            {/* Status Dot */}
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${statusColors[corStatus].dot}`} />

            {/* Título e descrição */}
            <h2 className="font-semibold text-lg">{titulo}</h2>
            <p className="text-gray-500 text-sm">{descricao}</p>

            {/* Responsável e Frequência */}
            <div className="flex justify-between text-sm mt-4">
                <div>
                    <p className="text-gray-500">RESPONSÁVEL</p>
                    <p className="font-semibold">Eng. {responsavel}</p>
                </div>
                <div>
                    <p className="text-gray-500">FREQUÊNCIA</p>
                    <p className="font-semibold">{frequencia}</p>
                </div>
            </div>

            {/* Rodapé: badge + ações */}
            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[corStatus].badge}`}>
                    {status}
                </span>

                <div className="flex gap-4 text-blue-600 text-lg">
                    <button title="Visualizar">
                        <i className="fas fa-eye" />
                    </button>
                    <button title="Editar">
                        <i className="fas fa-edit" />
                    </button>
                </div>
            </div>
        </div>
    );
}
