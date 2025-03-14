class DefaultFormatter {
    format(n) {
        // Return the number
        return `${n}`;
    }
}

class AccountingFormatter {
    format(n) {
        // If the number is negative, surround the number with parenthesis
        if (n < 0) {
            return `(${Math.abs(n)})`
        }
        // Else just return the number
        else {
            return `${n}`;
        }
    }
}

class BaseFormatter {

    // Non-default constructor
    constructor(base) {
        // Set the base number
        this.baseNumber = base;
    }

    format(n) {
        // If the number is negative, call the convert the base function without the negative sign
        if (n < 0) {
            return `-${this.convertToBase(Math.abs(n), this.baseNumber)}`;
        }
        // Else call the convert the base function
        else {
            return this.convertToBase(n, this.baseNumber);
        }
    }

    convertToBase(n, base) {
        // Character key
        const baseChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Base Case
        if (n === 0) {
            return "";
        }

        // This returns the original number divided by the base
        let whole = Math.floor(n / base);
        // This gives the remainder of what was divided
        let remain = n % base;
        /* This recursively calls the function when it is divided by the base
        and adds the character that corresponds to the remainder
        (for example: a remainder of 12 would return the character "C") */
        return this.convertToBase(whole, base) + baseChars.charAt(remain);
    }
}

class DecimalSeparatorFormatter {

    // Default constructor
    constructor() {}

    format(n) {
        // Set the number (n) to a string
        let nString = Math.abs(n).toString();
        // If the number is negative, call the recursive function without the negative sign
        if (n < 0) {
            return '-' + this.recursiveFunction(nString);
        }
        // Else call the recursive function
        else {
            return this.recursiveFunction(nString);
        }
    }

    recursiveFunction(nString) {
        // Base case
        if (nString.length <= 3) {
            // If base case is reached return the remaining numbers
            return nString;
        } 
        else {
            // Recursively call a substring and add the last three numbers with a comma to the stack
            return this.recursiveFunction(nString.slice(0, nString.length - 3)) + ',' + nString.slice(-3);
        }
    }
}


function formatNumber() {
    let num = parseInt(document.getElementById("number-input").value, 10);
    let base = parseInt(document.getElementById("base-input").value, 10);
    
    document.getElementById("default-output").innerText = "Default: " + new DefaultFormatter().format(num);
    document.getElementById("decimal-output").innerText = "Decimal: " + new DecimalSeparatorFormatter().format(num);
    document.getElementById("accounting-output").innerText = "Accounting: " + new AccountingFormatter().format(num);
    if (isNaN(base) || base < 2 || base > 36) {
        document.getElementById("base-output").innerText = "Invalid base (2-36 allowed)."
    }
    else {
        document.getElementById("base-output").innerText = `Base ${base}: ` + new BaseFormatter(base).format(num);
    }
}