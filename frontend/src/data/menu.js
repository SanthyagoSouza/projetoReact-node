export const menu = [
    {
        secao: "Principal",
        itens: [
            {
                nome: "Dashboard",
                rota: "/dashboard",
                icone: "fas fa-home"
            }
        ]
    },
    {
        secao: "Veículos",
        permissao: "carros",
        itens: [
            {
                nome: "Carros",
                rota: "/carros",
                icone: "fas fa-car"
            }
        ]
    },
    {
        secao: "Financeiro",
        permissao: "financeiro",
        itens: [
            {
                nome: "Financeiro",
                rota: "/financeiro",
                icone: "fas fa-dollar-sign"
            },
            {
                nome: "Documentos",
                rota: "/documentos",
                icone: "fas fa-file-alt" // 🔥 ajuste aqui
            }
        ]
    },
    {
        secao: "Configurações",
        permissao: "usuarios",
        itens: [
            {
                nome: "Usuários",
                rota: "/usuarios",
                icone: "fas fa-users"
            }
        ]
    }
];