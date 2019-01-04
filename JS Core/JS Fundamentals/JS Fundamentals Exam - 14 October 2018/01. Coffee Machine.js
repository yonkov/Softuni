function solve(input) {
    let totalMoney =+0;
    for (let item of input) {
        let inputparams = item.split(', ');
        let money = +inputparams[0];
        let price =+0;
        let drink = inputparams[1];
        let coffeeType='';
        let sugar = '';
        if (drink === 'coffee') {
            coffeeType = inputparams[2];
            if (coffeeType==='decaf') {
                price = 0.9
            } 
            else {
                price = 0.8
            }
            if (inputparams[3] === 'milk'){ 
                let milkPrice = +(price/10).toFixed(1);
                price+=milkPrice;
                sugar = +inputparams[4];
            } 
            else {
                sugar = +inputparams[3];
            }
        }
        else{
            price =0.8;
            if (inputparams[2] === 'milk') {
                let milkPrice = +(price/10).toFixed(1);
                price+=milkPrice;
                sugar = +inputparams[3];
            } 
            else {
                sugar = +inputparams[2];
            }
        }
        if (sugar!==0) {
            price+=0.1;
        }
        let change = Math.abs(price-money);
        if (money-price>=0) {
            console.log(`You ordered ${drink}. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
            totalMoney+=price;
        }
        else{
            console.log(`Not enough money for ${drink}. Need ${change.toFixed(2)}$ more.`);
        }
    }
    console.log(`Income Report: ${totalMoney.toFixed(2)}$`);   
}
