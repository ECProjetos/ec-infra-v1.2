import { Card } from "../ui/card";
import { ProgressBar } from "@/components/progessBar";

interface ProjectMilestone {
    description: string;
}

interface ProjectCard {
    title: string;
    status: string,
    progress: {
        value1: number;
        value2: number;
    };
    milestones: ProjectMilestone[];
}

interface ProjectCardsProps {
    data: ProjectCard[];
}

const statusStyles: Record<string, string> = {
    "Planejamento": "bg-green-100 text-green-700",
    "Em Andamento": "bg-blue-100 text-blue-700",
    "Concluído": "bg-gray-100 text-gray-700",
};

export function ProjectCards({ data }: ProjectCardsProps) {
    return (
        <>
            {data.map((project, idx) => {
                const percentual = project.progress.value2 === 0
                    ? 0
                    : (project.progress.value1 / project.progress.value2) * 100;

                return (
                    <Card
                        key={idx}
                        className="rounded-xl p-6 w-full border border-gray-200 transition-transform duration-300 ease-out hover:-translate-y-2"
                    >
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[project.status]}`}
                            >
                                {project.status}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Progresso</span>
                            <span className="text-sm font-semibold text-gray-800">
                                {percentual.toFixed(0)}%
                            </span>
                        </div>

                        <ProgressBar data={[project.progress]} />

                        <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Próximos marcos:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {project.milestones.map((m, i) => (
                                    <li key={i}>{m.description}</li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}
