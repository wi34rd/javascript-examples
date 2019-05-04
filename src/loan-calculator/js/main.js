class LoanCalculator {
    cardBlock = document.getElementById('card');
    loanForm = document.getElementById('loan-form');
    interestInput = document.getElementById('interest-input');
    amountInput = document.getElementById('amount-input');
    yearsInput = document.getElementById('years-input');
    monthlyPaymentInput = document.getElementById('monthly-payment-input');
    totalPaymentInput = document.getElementById('total-payment-input');
    totalInterestInput = document.getElementById('total-interest-input');
    loadingBlock = document.getElementById('loading');
    resultsBlock = document.getElementById('results');
    errorBlock = document.createElement('div');

    constructor() {
        this.errorBlock.className = 'alert alert-danger';
        this.errorBlock.isShown = false;

        this.loanForm.addEventListener('submit', (event) => this.loanFormSubmitHandler(event));
    }

    loanFormSubmitHandler(event) {
        event.preventDefault();

        this.loadingBlock.style.display = 'block';
        this.resultsBlock.style.display = 'none';
        setTimeout(() => {
            const principal = parseFloat(this.amountInput.value);
            const calculatedInterest = parseFloat(this.interestInput.value) / 100 / 12;
            const calculatedPayments = parseFloat(this.yearsInput.value) * 12;
            const x = Math.pow(1 + calculatedInterest, calculatedPayments);
            const monthlyPayment = (principal * x * calculatedInterest) / (x - 1);

            if (isFinite(monthlyPayment)) {
                this.monthlyPaymentInput.value = monthlyPayment.toFixed(2);
                this.totalPaymentInput.value = (monthlyPayment * calculatedPayments).toFixed(2);
                this.totalInterestInput.value = ((monthlyPayment * calculatedPayments) - principal).toFixed(2);
                this.resultsBlock.style.display = 'block';
            } else {
                this.showError('Пожалуйста проверьте введенные вами данные.');
            }

            this.loadingBlock.style.display = 'none';
        }, 2000);
    }

    showError(errorText) {
        if (this.errorBlock.isShown) {
            return;
        }

        this.errorBlock.appendChild(document.createTextNode(errorText));
        this.cardBlock.insertBefore(this.errorBlock, this.loanForm);
        this.errorBlock.isShown = true;

        setTimeout(() => {
            this.errorBlock.remove();
            this.errorBlock.childNodes[0].remove();
            this.errorBlock.isShown = false;
        }, 3000);
    }
}

loanCalculator = new LoanCalculator();
