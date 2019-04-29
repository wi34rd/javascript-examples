class LoanCalculator {
    constructor() {
        this._cardBlock = document.querySelector('.card');
        this._cardHeadingBlock = this._cardBlock.querySelector('.heading');
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
            this.showError('Пожалуйста проверьте введенные вами данные.');
        }
    }

    showError(errorText) {
        const errorBlock = document.createElement('div');
        errorBlock.className = 'alert alert-danger';
        errorBlock.appendChild(document.createTextNode(errorText));
        this._cardBlock.insertBefore(errorBlock, this._cardHeadingBlock);
        setTimeout(() => {
            this._cardBlock.querySelector('.alert').remove();
        }, 3000);
    }
}

new LoanCalculator();
