class LoanCalculator {
    card = document.getElementById('card');
    loanForm = document.getElementById('loan-form');
    interestInput = document.getElementById('interest-input');
    amountInput = document.getElementById('amount-input');
    yearsInput = document.getElementById('years-input');
    monthlyPaymentInput = document.getElementById('monthly-payment-input');
    totalPaymentInput = document.getElementById('total-payment-input');
    totalInterestInput = document.getElementById('total-interest-input');

    constructor() {
        this.loanForm.addEventListener('submit', (event) => this.onLoanFormSubmit(event));
    }

    onLoanFormSubmit(event) {
        event.preventDefault();

        const principal = parseFloat(this.amountInput.value);
        const calculatedInterest = parseFloat(this.interestInput.value) / 100 / 12;
        const calculatedPayments = parseFloat(this.yearsInput.value) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthlyPayment = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthlyPayment)) {
            this.monthlyPaymentInput.value = monthlyPayment.toFixed(2);
            this.totalPaymentInput.value = (monthlyPayment * calculatedPayments).toFixed(2);
            this.totalInterestInput.value = ((monthlyPayment * calculatedPayments) - principal).toFixed(2);
        } else {
            this.showError('Пожалуйста проверьте введенные вами данные.');
        }
    }

    showError(errorText) {
        const errorMessage = document.createElement('div');

        errorMessage.className = 'alert alert-danger';
        errorMessage.appendChild(document.createTextNode(errorText));
        this.card.insertBefore(errorMessage, this.loanForm);
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
}

loanCalculator = new LoanCalculator();
