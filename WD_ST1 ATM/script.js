var ATM = {
    is_auth: false,
    current_user: false,
    current_type: false,
    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 3000, type: "user"}
    ],

    reportOfLastActions: [],

    // authorization
    auth: function (number, pin) {
        if (this.is_auth) {
            return console.log('you are already logged in as ' + this.current_type + '. Account number: ' +
                this.current_user.number + '. Log out of current account please.');
        } else {
            for (let i = 0, length = this.users.length; i < length; i++) {
                let currentUsr = this.users[i];
                if (currentUsr.number === number && currentUsr.pin === pin) {
                    this.is_auth = true;
                    this.current_user = currentUsr;
                    this.current_type = currentUsr.type;
                    this.reportOfLastActions.push({
                        type: this.current_type, number: this.current_user.number, actionType: 'log in',
                        cashOfATM: this.cash
                    });
                    console.log('You successful registered.');
                    break;
                }
            }

            if (!this.is_auth) {
                console.log('You entered an incorrect password or number');
            }
        }
    },

    isAuthByUserType: function (type) {
        return this.current_type === type;
    },

    isValidNum: function (data) {
        if (!isNaN(+data) && (typeof data) !== 'boolean') {
            return true;
        }
        return console.log('Wrong data. Enter the correct number.');
    },

    checkAccessRightsFor: function (type) {
        if (!this.is_auth) {
            console.log('Enter account number and pin code.');
            return false;
        } else if (this.isAuthByUserType('admin') && type !== 'admin') {
            console.log('You are authorized as an administrator. This option is available only for users.');
            return false;
        } else if (this.isAuthByUserType('user') && type !== 'user') {
            console.log('You are authorized as an user. This option is available only for administrator.');
            return false;
        }
        return true;
    },

    // check current debet
    check: function () {
        if (!this.is_auth) {
            return console.log('Enter account number and pin code.');
        }
        this.reportOfLastActions.push({
            type: this.current_type, number: this.current_user.number, actionType: 'check debet', cashOfATM: this.cash
        });
        console.log('On your balance is: ' + this.current_user.debet);
    },

    // get cash - available for user only
    getCash: function (amount) {
        if (!this.checkAccessRightsFor('user')) {
            return;
        }
        if (!this.isValidNum(amount)) {
            return;
        }
        if (!this.cash) {
            return console.log('Sorry, but there is no money left in the ATM.');
        }

        amount = Math.abs(amount);

        if (amount > this.cash) {
            console.log('Sorry, but there is not enough money in the ATM. ' +
                'Try to withdraw the amount less.');
        } else if (this.current_user.debet - amount < 0) {
            console.log('There are not enough funds on your debet. ' +
                'You have: ' + this.current_user.debet);
        }

        this.current_user.debet -= amount;
        this.cash -= amount;

        this.reportOfLastActions.push({
            type: this.current_type, number: this.current_user.number, actionType: 'get cash',
            sum: amount, cashOfATM: this.cash
        });

        console.log('Operation successful. On your debet: ' + this.current_user.debet);
    },

    // load cash - available for user only
    loadCash: function (amount) {
        if (!this.checkAccessRightsFor('user')) {
            return;
        }
        if (!this.isValidNum(amount)) {
            return;
        }

        amount = Math.abs(amount);
        this.current_user.debet += amount;
        this.cash += amount;

        this.reportOfLastActions.push({
            type: this.current_type, number: this.current_user.number, actionType: 'load cash', sum: amount,
            cashOfATM: this.cash
        });

        console.log('Operation successful. On your debet: ' + this.current_user.debet);
    },

    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function (addition) {
        if (!this.checkAccessRightsFor('admin')) {
            return;
        }
        if (!this.isValidNum(addition)){
            return;
        }

        addition = Math.abs(addition);
        this.cash += addition;
        this.reportOfLastActions.push({
            type: this.current_type, number: this.current_user.number, actionType: 'addition cash',
            sum: addition, cashOfATM: this.cash
        });

        console.log('Operation successful. Amount of money in ATM: ' + this.cash);
    },

    // get report about cash actions - available for admin only - EXTENDED
    getReport: function () {
        if (!this.checkAccessRightsFor('admin')) {
            return;
        }
        console.table(this.reportOfLastActions);
    },

    // log out
    logout: function () {
        if (!this.is_auth) {
            return console.log('Before logging out, you must log into the system.');
        }
        this.reportOfLastActions.push({
            type: this.current_type, number: this.current_user.number, actionType: 'logout', cashOfATM: this.cash
        });
        this.is_auth = false;
        this.current_user = false;
        this.current_type = false;
        console.log('You have successfully logged out of your account. Have a nice day!');
    }
};