export interface CustomerProps{
    id: string;
    name: string;
    description: string;
    payment: 'Realizado' | 'Pendente';
    status: 'Realizado' | 'Parado' | 'Executando' | 'Não iniciado';
    create_at: Date | null;
    update_at: Date | null;
    serviceprice: string;
    total : string;
    customerId: string | null;
    supplierId: string | null;
    productId: string | null;
    userId: string | null;
}