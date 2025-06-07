/* 
🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
*/

/* function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log("Sto lanciando il dado...");
        setTimeout(() => {
            const valore = Math.floor(Math.random() * 6) + 1
            if (Math.random() < 0.2) {
                reject("Ops, il dado si è incastrato")
            } else {
                resolve(`Avanza di ${valore} caselle`)
            }
        }, 1000)
    })
}

lanciaDado()
    .then(messaggio => console.log(messaggio))
    .catch(error => console.log(error)) */

function creaLanciaDado() {

    let ultimoLancio = 0

    return function lancia() {
        return new Promise((resolve, reject) => {
            console.log("Sto lanciando il dado...");
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    reject("Ops, il dado si è incastrato");
                    return
                }
                const valore = Math.floor(Math.random() * 6) + 1
                if (valore === ultimoLancio) {
                    resolve(`Incredibile è uscito di nuovo il ${valore}!`)
                } else {
                    resolve(`Avanza di ${valore} caselle`)
                }
                ultimoLancio = valore
            }, 1000)
        })
    }


}

const lanciaDado = creaLanciaDado()
function ripetiLancio(n) {
    if (n === 0) return

    lanciaDado()
        .then(messaggio => {
            console.log(messaggio)
            ripetiLancio(n - 1)
        })
        .catch(error => {
            console.log(error);
            ripetiLancio(n - 1);
        })

}

ripetiLancio(10)


