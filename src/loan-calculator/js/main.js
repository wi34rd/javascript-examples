class LoanCalculator {
    constructor() {
        this._interestInput = document.getElementById('interest-input');
        this._amountInput = document.getElementById('amount-input');
        this._yearsInput = document.getElementById('years-input');
        this._monthlyPaymentInput = document.getElementById('monthly-payment-input');
        this._totalPaymentInput = document.getElementById('total-payment-input');
        this._totalInterestInput = document.getElementById('total-interest-input');

        document.getElementById('loan-form').addEventListener('submit', (event) => this._onLoanFormSubmit(event));
    }

    _onLoanFormSubmit(event) {
        event.preventDefault();

        const principal = parseFloat(this._amountInput.value);
        const calculatedInterest = parseFloat(this._interestInput.value) / 100 / 12;
        const calculatedPayments = parseFloat(this._yearsInput.value) * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthlyPayment = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthlyPayment)) {
            this._monthlyPaymentInput.value = monthlyPayment.toFixed(2);
            this._totalPaymentInput.value = (monthlyPayment * calculatedPayments).toFixed(2);
            this._totalInterestInput.value = ((monthlyPayment * calculatedPayments) - principal).toFixed(2);
        } else {
            console.error('Пожалуйста проверьте введенные вами данные.');
        }
    }
}

new LoanCalculator();
