export function parseRole(role: string){
    switch(role){
        case 'owner':
            return 'Propietario';
        case 'admin':
            return 'Administrador';
        case 'manager':
            return 'Gerente';
        case 'staff':
            return 'Empleado';
        default:
            return 'Desconocido';
    }
}