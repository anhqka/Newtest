import Recharge from "components/client/update_customer/Recharge";

const Customer = ({auth}) => {
    return (
        <>
            { auth?.openRecharge && <Recharge auth = {auth}/> }
        </>
    )
}

export default Customer