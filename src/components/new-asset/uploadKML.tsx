import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function UploadKMLKMZ() {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };

    return (
        <div className="space-y-2">
            <Label className="font-medium">Arquivo KMZ/KML do Terminal</Label>
            <div className="flex items-center gap-4">
                <Input
                    type="file"
                    accept=".kmz,.kml"
                    onChange={handleFileChange}
                    className="bg-white"
                />
                <span className="text-sm text-gray-700">{fileName}</span>
            </div>
        
        </div>
    );
}
