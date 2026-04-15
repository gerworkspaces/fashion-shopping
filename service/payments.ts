import { getData, deleteData } from "./api-service";

export class PaymentsService {
    getAllPayments() {
        return getData("/payments");
    }
    deletePayment(id: number) {
        return deleteData(`/payments?id=${id}`);
    }
}
