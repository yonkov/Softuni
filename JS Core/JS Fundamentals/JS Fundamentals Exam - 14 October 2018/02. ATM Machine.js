function solve(input) {
    let balance = +0;
    let banknotes = [];
    for (let arr of input) {
        let cash = +0;
        if (arr.length > 2) {
            //Insert
            for (let item of arr) {
                cash += +item;
                banknotes.push(+item);
            }
            balance += cash;
            banknotes = banknotes.sort((a, b) => b - a);

            console.log(`Service Report: ${cash}$ inserted. Current balance: ${balance}$.`);

        } else if (arr.length === 2) {
            //Withdraw
            let accountBalance = arr[0];
            let moneyToWithdraw = arr[1];


            if (moneyToWithdraw > balance) {
                console.log('ATM machine is out of order!');
            } else if (moneyToWithdraw <= accountBalance) {
                balance -= moneyToWithdraw;
                console.log(`You get ${moneyToWithdraw}$. Account balance: ${accountBalance-moneyToWithdraw}$. Thank you!`);
                let currentSum = 0;
                let moneyLeft = moneyToWithdraw;
                for (let i = 0; i < banknotes.length; i++) {
                    let banknote = banknotes[i];
                    if (banknote <= moneyLeft) {
                        currentSum += banknote;
                        moneyLeft -= banknote;
                        if (currentSum === moneyToWithdraw) {
                            banknotes.splice(i, 1);
                            break;
                        }
                        banknotes.splice(i, 1);
                        i--;
                    }
                };

            } else if (moneyToWithdraw > accountBalance) {
                console.log(`Not enough money in your account. Account balance: ${accountBalance}$.`);
            }
        } else if (arr.length === 1) {
            let counter = +0;
            let banknote = +arr[0];
            counter = banknotes.filter(function (x) {
                return x === banknote;
            });
            console.log(`Service Report: Banknotes from ${banknote}$: ${counter.length}.`);
        }
    }
};
