import Services from "../Services";
import Transactions from "../Transactions";
import Welcome from "../Welcome";

export default function Wallet () {
    return (
        <>
            <Welcome />
            <Services />
            <Transactions />
        </>
    )
}