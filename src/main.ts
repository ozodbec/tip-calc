class TipCalculator {
  private billInput: HTMLInputElement;
  private tipInputs: NodeListOf<HTMLInputElement>;
  private tipCustom: HTMLInputElement;
  private peopleInput: HTMLInputElement;
  private amountOutput: HTMLHeadingElement;
  private totalOutput: HTMLHeadingElement;
  private resetBtn: HTMLButtonElement;

  constructor() {
      this.billInput = document.getElementById('bill') as HTMLInputElement;
      this.tipInputs = document.querySelectorAll('input[name="tip"]') as NodeListOf<HTMLInputElement>;
      this.tipCustom = document.getElementById('tip-custom') as HTMLInputElement;
      this.peopleInput = document.querySelector('input[placeholder="0"]') as HTMLInputElement;
      this.amountOutput = document.getElementById('amount') as HTMLHeadingElement;
      this.totalOutput = document.querySelector('.total') as HTMLHeadingElement;
      this.resetBtn = document.querySelector('.btn') as HTMLButtonElement;

      this.initialize();
  }

  private initialize() {
      this.billInput.addEventListener('input', () => this.calculateTip());
      this.tipInputs.forEach(input => input.addEventListener('change', () => this.calculateTip()));
      this.tipCustom.addEventListener('input', () => this.calculateTip());
      this.peopleInput.addEventListener('input', () => this.calculateTip());
      this.resetBtn.addEventListener('click', () => this.reset());
  }

  private calculateTip() {
      const bill = parseFloat(this.billInput.value) || 0;
      const people = parseInt(this.peopleInput.value) || 1;
      let tipPercent = this.getSelectedTipPercent();

      if (tipPercent === 0) {
          tipPercent = parseFloat(this.tipCustom.value) || 0;
      }

      const tipAmount = ((bill * tipPercent) / 100) / people;
      const totalAmount = (bill + tipAmount) / people;
      console.log(totalAmount)

      this.amountOutput.textContent = `$ ${tipAmount.toFixed(2)}`;
      this.totalOutput.textContent = `$ ${totalAmount.toFixed(2)}`;
  }

  private getSelectedTipPercent(): number {
      const selectedTip = document.querySelector('input[name="tip"]:checked') as HTMLInputElement;
      return selectedTip ? parseFloat(selectedTip.value) : 0;
  }

  private reset() {
      this.billInput.value = '';
      this.tipInputs.forEach(input => input.checked = false);
      this.tipCustom.value = '';
      this.peopleInput.value = '';
      this.amountOutput.textContent = `$ 0.00`;
      this.totalOutput.textContent = `$ 0.00`;
  }
}

// Initialize the calculator
new TipCalculator();