const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalanace = await connection.getBalance(publicKey);

        console.log(walletBalanace, "walletBalanace")
    }catch(e){
        console.log(e.message);
    }
}

const airDropSol = async() =>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)

    }catch(er){
        console.log('Error Here: '+er)
    }
}

const main = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main();