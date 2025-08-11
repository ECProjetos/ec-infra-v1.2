'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor, faBell, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import 'animate.css';
import { CadastroTerminalPortuarioDialog } from "./config-assets/addAsset";
import { ConfigurarUsuarios } from "./config-users/usersPermissions";
import { logoutClient } from "@/app/(auth)/logoutClient";
import { ConfigurarLaboratorios } from "./config-lab/labConfig";

export function AppNav() {
    return (
        <nav className="fixed top-0 left-0 z-500 w-full h-20 flex items-center justify-between px-6 bg-white shadow-md">
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft">
                <a href="/selecionar-ativo">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faAnchor} className="text-white w-4 h-4" />
                    </div>
                </a>

                <div>
                    <h1 className="text-md font-semibold leading-tight">EC Infra
                    </h1>
                    <p className="text-sm text-muted-foreground">Dashboard Executivo</p>
                </div>
            </div>



            <div className="flex items-center gap-6 text-sm text-muted-foreground animate__animated animate__fadeInRight animate__delay-1s">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                    <span>
                        {new Date().toLocaleDateString('pt-BR')}
                    </span>
                </div>
                <FontAwesomeIcon icon={faBell} className="text-gray-400 w-5 h-5 cursor-pointer" />

                <CadastroTerminalPortuarioDialog />

                <ConfigurarUsuarios />

                <ConfigurarLaboratorios />

                <p className="text-red-500 cursor-pointer" onClick={logoutClient}>Sair</p>
            </div>
        </nav >
    )
}
