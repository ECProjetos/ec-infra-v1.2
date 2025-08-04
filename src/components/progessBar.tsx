interface ProgressBarType {
    value1: number;
    value2: number;
}

interface ProgressBarProps {
    data: ProgressBarType[];
}

function interpolateColor(percent: number) {
    const clamp = (v: number) => Math.max(0, Math.min(255, v));

    // Interpolação: 0% = verde (#22C55E), 50% = laranja (#FFA500), 100% = vermelho (#EF4444)
    let r, g, b;
    if (percent < 50) {
        // Verde para Laranja
        const t = percent / 50;
        r = clamp(34 + (255 - 34) * t);
        g = clamp(197 + (165 - 197) * t);
        b = clamp(94 + (0 - 94) * t);
    } else {
        // Laranja para Vermelho
        const t = (percent - 50) / 50;
        r = clamp(255 + (239 - 255) * t);
        g = clamp(165 + (68 - 165) * t);
        b = clamp(0 + (68 - 0) * t);
    }

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export function ProgressBar({ data }: ProgressBarProps) {
    return (
        <>
            {data.map((card, idx) => {
                const percentual = (card.value2 === 0) ? 0 : (card.value1 / card.value2) * 100;
                const barColor = interpolateColor(percentual);

                return (
                    <div key={idx}>
                        <div className="w-full bg-gray-200 h-2 rounded mb-2">
                            <div
                                className="h-2 rounded"
                                style={{
                                    width: `${percentual}%`,
                                    backgroundColor: barColor
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}
