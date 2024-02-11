# SENDING ETH TROUGH A FUNCTION AND REVERTS

- Vamos a trabajar con recibir fondos, enviar fondos y setear un minimo de fondos
- En una transferencia tengo 
  - Nonce: 
  - Gas Price: precio por unidad de gas (in wei) 
  - Gas Limit:  21000
  - To: address that the tx is sent to
  - Value amount of wei to send
  - Data: empty
  - v.r.s: components of tx signature
- Añadiendo **payable** a la función puedo acceder a la propiedad **VALUE** con msg.value
  - Uso **require** para marcar la obligatoriedad. Chequea que la condición se cumpla, si no enviará el string del segundo parámetro
  - 1e18 = 1 *10**18 == 1000000000000000000

~~~solidity
//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract FundMe{
  uint256 public number;

   
    function fund() public payable{
      //Quiero setear un minimo de fondos en USD
      //Cómo envio ETH a este contrato?
      
      number= 5; //cambiar number a 5 gasta GAS
        require(msg.value > 1e18, "Didn't send enough"); // si los fondos no son suficientes no cambiará number a 5
    }
    //function withdraw (){}
}
~~~

- Aunque hemos gastado GAS en cambiar a 5 number, el resto de GAS se retornará porque no se cumple la condición del require
- Entonces, **si el require no se cumple, toda transacción anterior se deshará**
- Oráculos como **Chain LInk** permiten introducir data del exterior en los smart contracts
- Em **docs.chain.link** accedo en **DATA FEEDs**/**Contract Addresses**/**Ethereum Data Feeds** en el apartado Proxy de la tabla obtengo las direcciones de los contratos que me proporcionan el valor en tiempo real del token/cripto que sea
- Tengo Pair: ADA / USD (cardano en USD), Type: Crypto, Proxy: 0xAE4c91d....
- En Using Data Feeds tengo un ejemplo de uso

~~~solidity
contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43    //address from proxy value to get proce in real time
        );
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer, //extraes con desestructuración la respuesta que deseas
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
~~~

- **Chain Link keepers** son watchers que escuchan un contrato y las acciones que en este se producen
- **End-to-End Reiability** hace posible usar HTTP Request (GET, POST, etc)
- Caundo requerimos info de un node de ChainLink requerimos GAS o algun token de ChainLink
- En faucets.chain.lionk/kovan puedes enviarte a tu dirección **10 test tokens de Chain Link**
- En docs, en Link Token Contracts, copio la addres de la red Kovan, en Metamask, Import Tokens, en Token contract Address pego la dirección, Add custom Tokens, y Import Tokens
- Ahora puedo enviar Tokens de CHain Link
---------

## Trabajando con Chain Link

- 4:02:24